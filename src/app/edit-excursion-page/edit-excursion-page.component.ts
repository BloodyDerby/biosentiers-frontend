import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
import Leaflet from 'leaflet';
import { Map } from 'leaflet';
import cloneDeep from 'lodash/cloneDeep';
import compact from 'lodash/compact';
import includes from 'lodash/includes';
import indexOf from 'lodash/indexOf';
import times from 'lodash/times';
import reduce from 'lodash/reduce';
import moment from 'moment';
import { IMyOptions } from 'ngx-mydatepicker';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { BioTrailsService } from '../trails/trails.service';
import { Excursion } from '../models/excursion';
import { Trail } from '../models/trail';
import { EditExcursionService } from './edit-excursion.service';
import { EditExcursionDetailsStepComponent } from './edit-excursion-details-step.component';
import { EditExcursionPoisStepComponent } from './edit-excursion-pois-step.component';
import { EditExcursionParticipantsStepComponent } from './edit-excursion-participants-step.component';

const STEPS = [
  EditExcursionDetailsStepComponent,
  EditExcursionParticipantsStepComponent,
  EditExcursionPoisStepComponent
];

const STEP_PATHS = [
  '',
  'participants',
  'pois'
];

@Component({
  selector: 'bio-edit-excursion-page',
  templateUrl: './edit-excursion-page.component.html',
  styleUrls: ['./edit-excursion-page.component.styl']
})
export class EditExcursionPageComponent implements OnInit {

  excursion: Excursion;

  constructor(private editExcursionService: EditExcursionService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.editExcursionService.edit(this.route.snapshot.params['id']);
    this.editExcursionService.excursionObs.subscribe((excursion) => {
      this.excursion = excursion;
    });
  }

  ngOnDestroy() {
    this.editExcursionService.stopEditing();
  }

  isPreviousStepEnabled() {
    return this.getCurrentStepIndex() > 0;
  }

  previousStep() {

    const i = this.getCurrentStepIndex();
    if (i <= 0) {
      return;
    }

    this.router.navigate(compact([ '/excursions', this.excursion.id, 'edit', STEP_PATHS[i - 1] ]));
  }

  isNextStepEnabled() {
    return this.getCurrentStepIndex() < STEPS.length - 1;
  }

  nextStep() {

    const i = this.getCurrentStepIndex();
    if (i >= STEPS.length - 1) {
      return;
    }

    this.router.navigate(compact([ '/excursions', this.excursion.id, 'edit', STEP_PATHS[i + 1] ]));
  }

  getCurrentStep() {
    return this.route.snapshot.children[0].component;
  }

  getCurrentStepIndex() {
    return indexOf(STEPS, this.getCurrentStep());
  }

}
