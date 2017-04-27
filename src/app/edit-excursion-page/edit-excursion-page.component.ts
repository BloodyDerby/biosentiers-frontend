import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectComponent } from 'angular2-select/dist/select.component';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
import Leaflet from 'leaflet';
import { Map } from 'leaflet';
import cloneDeep from 'lodash/cloneDeep';
import includes from 'lodash/includes';
import times from 'lodash/times';
import reduce from 'lodash/reduce';
import moment from 'moment';
import { IMyOptions } from 'ngx-mydatepicker';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { BioParticipantsService } from '../participants/participants.service';
import { BioThemes } from '../data/themes';
import { BioTrailsService } from '../trails/trails.service';
import { BioZones } from '../data/zones';
import { Excursion } from '../models/excursion';
import { Participant } from '../models/participant';
import { Trail } from '../models/trail';

@Component({
  selector: 'bio-edit-excursion-page',
  templateUrl: './edit-excursion-page.component.html',
  styleUrls: ['./edit-excursion-page.component.styl']
})
export class EditExcursionPageComponent implements OnInit {

  private excursion: Excursion;
  private excursionForm: FormGroup;
  private trailChoices: Array<{ [s: string]: string; }>;
  private themeChoices: Array<string>;
  private selectedThemes: any;
  private zoneChoices: Array<any>;
  private map: Map;
  private mapOptions: any;
  private mapBounds: any;
  private mapBoundsOptions: any;

  @ViewChild('map')
  private mapDirective: LeafletDirective;

  @ViewChild('trailIdSelect')
  private trailIdSelect: SelectComponent;

  private datepickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
    dayLabels: { mo: 'Lun', tu: 'Mar', we: 'Mer', th: 'Jeu', fr: 'Ven', sa: 'Sam', su: 'Dim' },
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
    editableMonthAndYear: false,
    monthLabels: { 1: 'Janvier', 2: 'Février', 3: 'Mars', 4: 'Avril', 5: 'Mai', 6: 'Juin', 7: 'Juillet', 8: 'Août', 9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre' },
    todayBtnTxt: 'Aujourd\'hui'
  };

  constructor(private excursionsService: BioExcursionsService, private formBuilder: FormBuilder, private participantsService: BioParticipantsService, private route: ActivatedRoute, private router: Router, private trailsService: BioTrailsService) {

    this.themeChoices = cloneDeep(BioThemes);
    this.selectedThemes = reduce(BioThemes, (memo, theme) => {
      memo[theme['id']] = false;
      return memo;
    }, {});

    let minLat, minLng, maxLat, maxLng;
    BioZones.features.forEach(function(zone) {
      zone.geometry.coordinates[0].forEach(function(coords) {
        if (minLng === undefined || coords[0] < minLng) {
          minLng = coords[0];
        }
        if (maxLng === undefined || coords[0] > maxLng) {
          maxLng = coords[0];
        }
        if (minLat === undefined || coords[1] < minLat) {
          minLat = coords[1];
        }
        if (maxLat === undefined || coords[1] > maxLat) {
          maxLat = coords[1];
        }
      });
    });

    const southWest = L.latLng(minLat, minLng);
    const northEast = L.latLng(maxLat, maxLng);
    const bounds = L.latLngBounds(southWest, northEast);
    this.mapBounds = bounds;
    this.mapBoundsOptions = {
      padding: [ 20, 20 ]
    };

    let features = cloneDeep(BioZones.features);
    this.zoneChoices = features;

    this.mapOptions = {
      doubleClickZoom: false,
      scrollWheelZoom: false,
      zoomControl: false,
      layers: [
        Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        L.geoJSON(features, {
          style: function(feature) {
            return {
              stroke: true,
              color: feature.properties['selected'] ? '#008b00' : '#8b0000',
              fill: true,
              fillColor: feature.properties['selected'] ? '#00ff00' : '#ff0000',
              fillOpacity: 0.5
            };
          },
          onEachFeature: function(feature, layer) {
            feature['layer'] = layer;

            layer.on({
              click: function(event) {
                feature.properties['selected'] = !feature.properties['selected'];

                event.target.setStyle({
                  color: feature.properties['selected'] ? '#008b00' : '#8b0000',
                  fillColor: feature.properties['selected'] ? '#00ff00' : '#ff0000',
                });

                return false;
              }
            })
          }
        })
      ]
    };
  }

  ngOnInit() {
    this.initializeExcursionForm();

    const excursionId: String = this.route.snapshot.params['id'];
    if (excursionId) {
      this.loadExcursion(excursionId);
    } else {
      this.excursion = new Excursion();
      this.loadTrails();

      for (let theme in this.selectedThemes) {
        this.selectedThemes[theme] = true;
      }

      this.zoneChoices.forEach((zone) => {
        zone.properties['selected'] = true
        zone['layer'].setStyle({
          color: zone.properties['selected'] ? '#008b00' : '#8b0000',
          fillColor: zone.properties['selected'] ? '#00ff00' : '#ff0000',
        });
      });
    }
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  toggleZone(zone: any) {
    zone.properties['selected'] = !zone.properties['selected'];
    zone['layer'].setStyle({
      color: zone.properties['selected'] ? '#008b00' : '#8b0000',
      fillColor: zone.properties['selected'] ? '#00ff00' : '#ff0000',
    });
  }

  initializeExcursionForm() {
    this.excursionForm = this.formBuilder.group({
      trailId: [ '', Validators.required ],
      name: [ '', Validators.maxLength(60) ],
      plannedAt: [ '', Validators.required ],
      participants: this.formBuilder.array([]),
      participantsIncrement: [ '1' ]
    });

    var now: Date = moment().startOf('day').toDate();
    this.excursionForm.controls['plannedAt'].setValue({
      date: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
      },
      jsdate: now
    });
  }

  loadExcursion(excursionId: String) {

    var params: RetrieveExcursionParams = {
      includeCreator: true,
      includeTrail: true
    };

    this.excursionsService.retrieve(excursionId, params).subscribe(excursion => {

      this.excursion = excursion;
      this.excursionForm.patchValue({
        name: excursion.name
        // FIXME: update excursion date
      });

      for (let themeId in this.selectedThemes) {
        this.selectedThemes[themeId] = includes(excursion.themes, themeId);
      }

      this.zoneChoices.forEach((zone, i) => {
        zone.properties['selected'] = includes(excursion.zones, i)

        if (zone['layer']) {
          zone['layer'].setStyle({
            color: zone.properties['selected'] ? '#008b00' : '#8b0000',
            fillColor: zone.properties['selected'] ? '#00ff00' : '#ff0000',
          });
        }
      });

      this.participantsService.retrieveAll(this.excursion).subscribe(participants => {
        if (participants.length) {
          participants.forEach(participant => this.addParticipant(participant));
        } else {
          this.addParticipant();
        }
      });
    });
  }

  loadTrails() {
    this.trailsService.retrieveAll().subscribe(trails => {
      this.trailChoices = reduce(trails, (memo, trail) => {
        memo.push({
          value: trail.id,
          label: trail.name
        });

        return memo;
      }, []);

      if (trails.length) {
        setTimeout(() => this.trailIdSelect.select(trails[0].id), 0);
      }
    });
  }

  saveExcursion(event) {
    event.preventDefault();

    if (!this.excursion.id) {
      this.excursionsService.create(this.getFormExcursion()).subscribe(excursion => {
        this.router.navigate([ '/excursions', excursion.id ])
      });
    }
  }

  addParticipantBatch() {
    times(this.excursionForm.value.participantsIncrement, () => this.addParticipant());
  }

  addParticipant(participant?: Participant) {
    this.getParticipantsFormArray().push(this.formBuilder.group({
      id: [ participant ? participant.id : null ],
      name: [ participant ? participant.name : '' ]
    }));
  }

  onParticipantRemoved(participantForm: FormGroup) {
    const participantsFormArray: FormArray = this.getParticipantsFormArray();
    participantsFormArray.removeAt(participantsFormArray.controls.indexOf(participantForm));
  }

  getParticipantsFormArray(): FormArray {
    return <FormArray>this.excursionForm.controls['participants'];
  }

  getFormExcursion(): Excursion {
    var value = this.excursionForm.value;
    return new Excursion({
      trailId: value.trailId,
      name: value.name,
      themes: this.getSelectedThemes(),
      zones: this.getSelectedZones(),
      plannedAt: value.plannedAt.jsdate
    });
  }

  getSelectedThemes(): Array<string> {
    return reduce(this.selectedThemes, (memo, selected, theme) => {
      if (selected) {
        memo.push(theme);
      }

      return memo;
    }, []);
  }

  getSelectedZones(): Array<number> {
    return reduce(this.zoneChoices, (memo, zone, i) => {
      if (zone.properties.selected) {
        memo.push(i);
      }

      return memo;
    }, []);
  }

}
