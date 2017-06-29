import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import extend from 'lodash/extend';
import omit from 'lodash/omit';
import { Observable, ReplaySubject, Subscription } from 'rxjs/Rx';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { Excursion } from '../models/excursion';
import { triggerObservable } from '../utils/async';

const retrieveExcursionParams: RetrieveExcursionParams = {
  includeCreator: true,
  includeTrail: true
};

@Injectable()
export class EditExcursionService {

  excursionForm: FormGroup;
  excursionObs: Observable<Excursion>;
  excursionUpdateSubscription: Subscription;

  private excursionStream: ReplaySubject<Excursion>;

  constructor(private excursionsService: BioExcursionsService, private formBuilder: FormBuilder, private router: Router) {

    this.excursionStream = new ReplaySubject(1);
    this.excursionObs = this.excursionStream.asObservable().filter(excursion => !!excursion);

    this.initExcursionForm();
    this.excursionObs.subscribe(excursion => {
      if (!excursion) {
        return;
      }

      this.updateExcursionForm(excursion)

      this.excursionUpdateSubscription = this.excursionForm
        .valueChanges
        .skip(1)
        .filter(() => this.excursionForm.valid)
        .distinctUntilChanged()
        .debounce(values => Observable.of().delay(values.id ? 1000 : 0))
        .subscribe(values => this.updateExcursion(values));
    });
  }

  edit(id?: string) {
    if (id) {
      this.loadExcursion(id);
    } else {
      this.setExcursion(new Excursion({
        themes: [],
        zones: [],
        plannedAt: new Date().toISOString()
      }));
    }
  }

  save(): Observable<Excursion> {
    if (!this.excursionForm.valid) {
      return Observable.throw(new Error('Excursion is invalid'));
    }

    let obs;
    const excursion = new Excursion(this.processFormValues(this.excursionForm.value));
    if (excursion.id) {
      obs = this.excursionsService.update(excursion, retrieveExcursionParams);
    } else {
      obs = this.excursionsService.create(excursion, retrieveExcursionParams);
    }

    obs = obs.do((excursion) => this.setExcursion(excursion));

    return triggerObservable<Excursion>(obs);
  }

  stopEditing() {
    this.excursionStream.next(null);

    if (this.excursionUpdateSubscription) {
      this.excursionUpdateSubscription.unsubscribe();
      this.excursionUpdateSubscription = null;
    }
  }

  private initExcursionForm() {
    this.excursionForm = this.formBuilder.group({
      id: [ '' ],
      trailId: [ '', Validators.required ],
      name: [ '', Validators.maxLength(60) ],
      plannedAt: [ '', Validators.required ],
      themes: [ [] ],
      zones: [ [] ]
    });
  }

  private updateExcursionForm(excursion: Excursion) {
    const plannedAt = new Date(excursion.plannedAt);
    this.excursionForm.patchValue({
      id: excursion.id,
      name: excursion.name,
      trailId: excursion.trailId,
      plannedAt: {
        date: {
          year: plannedAt.getFullYear(),
          month: plannedAt.getMonth() + 1,
          day: plannedAt.getDate()
        },
        jsdate: plannedAt
      },
      themes: excursion.themes,
      zones: excursion.zones
    });
  }

  private loadExcursion(excursionId: string) {
    this.excursionsService.retrieve(excursionId, retrieveExcursionParams).subscribe(excursion => this.setExcursion(excursion));
  }

  private setExcursion(excursion: Excursion) {
    this.excursionStream.next(excursion);
  }

  private updateExcursion(values) {
    if (values.id) {
      const excursion = new Excursion(this.processFormValues(values));
      this.excursionsService.update(excursion).subscribe(excursion => {});
    }
  }

  private processFormValues(values) {
    if (values.plannedAt) {
      values.plannedAt = values.plannedAt.jsdate;
    }

    return values;
  }

}
