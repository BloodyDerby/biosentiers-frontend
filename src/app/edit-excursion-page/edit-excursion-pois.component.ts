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
import { BioThemes } from '../data/themes';
import { BioTrailsService } from '../trails/trails.service';
import { BioZones } from '../data/zones';
import { Excursion } from '../models/excursion';
import { Trail } from '../models/trail';
import { EditExcursionService } from './edit-excursion.service';

@Component({
  selector: 'bio-edit-excursion-pois',
  templateUrl: './edit-excursion-pois.component.html',
  styleUrls: ['./edit-excursion-pois.component.styl']
})
export class EditExcursionPoisComponent implements OnInit {

  private excursion: Excursion;
  private themeChoices: Array<string>;
  private selectedThemes: any;
  private zoneChoices: Array<any>;
  private map: Map;
  private mapOptions: any;
  private mapBounds: any;
  private mapBoundsOptions: any;

  @ViewChild('map')
  private mapDirective: LeafletDirective;

  constructor(private editExcursionService: EditExcursionService, private formBuilder: FormBuilder) {

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
          style: (feature) => {
            return {
              stroke: true,
              color: feature.properties['selected'] ? '#008b00' : '#8b0000',
              fill: true,
              fillColor: feature.properties['selected'] ? '#00ff00' : '#ff0000',
              fillOpacity: 0.5
            };
          },
          onEachFeature: (feature, layer) => {
            feature['layer'] = layer;

            layer.on({
              click: (event) => {
                this.toggleZone(feature);
              }
            })
          }
        })
      ]
    };
  }

  ngOnInit() {
    this.editExcursionService.excursion$.subscribe((excursion) => {
      if (!excursion) {
        return;
      }

      this.excursion = excursion;

      for (let themeId in this.selectedThemes) {
        this.selectedThemes[themeId] = includes(excursion.themes || [], themeId);
      }

      this.zoneChoices.forEach((zone, i) => {
        zone.properties['selected'] = includes(excursion.zones || [], i)

        if (zone['layer']) {
          zone['layer'].setStyle({
            color: zone.properties['selected'] ? '#008b00' : '#8b0000',
            fillColor: zone.properties['selected'] ? '#00ff00' : '#ff0000',
          });
        }
      });
    });
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  toggleTheme(theme: any) {
    this.selectedThemes[theme.id] = !this.selectedThemes[theme.id];
    this.excursion.themes = this.getSelectedThemes();
    this.editExcursionService.save();
  }

  toggleZone(zone: any) {

    zone.properties['selected'] = !zone.properties['selected'];
    zone['layer'].setStyle({
      color: zone.properties['selected'] ? '#008b00' : '#8b0000',
      fillColor: zone.properties['selected'] ? '#00ff00' : '#ff0000',
    });

    this.excursion.zones = this.getSelectedZones();
    this.editExcursionService.save();
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
