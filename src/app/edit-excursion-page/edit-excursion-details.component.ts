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
  selector: 'bio-edit-excursion-details',
  templateUrl: './edit-excursion-details.component.html',
  styleUrls: []
})
export class EditExcursionDetailsComponent implements OnInit {

  private excursion: Excursion;
  private excursionForm: FormGroup;
  private trailChoices: Array<{ [s: string]: string; }>;

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

  constructor(private editExcursionService: EditExcursionService, private excursionsService: BioExcursionsService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private trailsService: BioTrailsService) {
  }

  ngOnInit() {
    this.initializeExcursionForm();

    this.editExcursionService.excursion$.subscribe((excursion) => {
      if (!excursion) {
        return;
      }

      this.excursion = excursion;
      this.excursionForm.patchValue({
        name: excursion.name
        // FIXME: update excursion date
      });

      if (!excursion.id) {
        this.loadTrails();
      }
    });
  }

  initializeExcursionForm() {
    this.excursionForm = this.formBuilder.group({
      trailId: [ '', Validators.required ],
      name: [ '', Validators.maxLength(60) ],
      plannedAt: [ '', Validators.required ]
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
        this.router.navigate([ '/excursions', excursion.id, 'edit' ])
      });
    }
  }

  getFormExcursion(): Excursion {
    var value = this.excursionForm.value;
    return new Excursion({
      trailId: value.trailId,
      name: value.name,
      themes: this.excursion.themes,
      zones: this.excursion.zones,
      plannedAt: value.plannedAt.jsdate
    });
  }

}
