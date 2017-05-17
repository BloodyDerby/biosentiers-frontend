import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectComponent } from 'angular2-select/dist/select.component';
import reduce from 'lodash/reduce';
import moment from 'moment';
import { INgxMyDpOptions } from 'ngx-mydatepicker';

import { BioExcursionsService } from '../excursions/excursions.service';
import { BioTrailsService } from '../trails/trails.service';
import { Excursion } from '../models/excursion';
import { EditExcursionService } from './edit-excursion.service';

@Component({
  selector: 'bio-edit-excursion-details-step',
  templateUrl: './edit-excursion-details-step.component.html'
})
export class EditExcursionDetailsStepComponent implements OnInit {

  excursion: Excursion;
  excursionForm: FormGroup;
  trailChoices: Array<{ [s: string]: string; }>;

  @ViewChild('trailIdSelect')
  private trailIdSelect: SelectComponent;

  private datepickerOptions: INgxMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    dayLabels: { mo: 'Lun', tu: 'Mar', we: 'Mer', th: 'Jeu', fr: 'Ven', sa: 'Sam', su: 'Dim' },
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
    monthSelector: false,
    yearSelector: false,
    monthLabels: { 1: 'Janvier', 2: 'Février', 3: 'Mars', 4: 'Avril', 5: 'Mai', 6: 'Juin', 7: 'Juillet', 8: 'Août', 9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre' },
    todayBtnTxt: 'Aujourd\'hui'
  };

  constructor(private editExcursionService: EditExcursionService, private excursionsService: BioExcursionsService, private formBuilder: FormBuilder, private router: Router, private trailsService: BioTrailsService) {
  }

  ngOnInit() {
    this.editExcursionService.excursionObs.subscribe((excursion) => {
      this.excursion = excursion;
      this.excursionForm = this.editExcursionService.excursionForm;

      if (!excursion.id) {
        this.loadTrails();
      }
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
