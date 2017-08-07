import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import each from 'lodash/each';
import extend from 'lodash/extend';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import moment from 'moment';
import { Observable, ReplaySubject, Subscription } from 'rxjs/Rx';

import { ExcursionsService, RetrieveExcursionParams } from '../excursions';
import { Excursion } from '../models';

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

  constructor(private excursionsService: ExcursionsService, private formBuilder: FormBuilder, private router: Router) {

    this.excursionStream = new ReplaySubject(1);
    this.excursionObs = this.excursionStream.asObservable().filter(excursion => !!excursion);

    this.initExcursionForm();

    this.excursionObs.subscribe(excursion => {
      this.updateExcursionForm(excursion)

      if (!this.excursionUpdateSubscription) {
        this.excursionUpdateSubscription = this.excursionForm
          .valueChanges
          .filter(() => this.excursionForm.valid)
          .map(values => this.processFormValues(values))
          // FIXME: an update is triggered the first time even if change is irrelevant (participants count)
          .distinctUntilChanged((previous, next) => isEqual(previous, next))
          .debounce(values => Observable.of().delay(values.id ? 750 : 0))
          .subscribe(values => this.updateExcursion(values));
      }
    });
  }

  edit(id?: string) {
    if (id) {
      this.loadExcursion(id);
    } else {
      this.setExcursion(new Excursion({
        themes: [],
        zoneHrefs: [],
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

    obs = obs.do((excursion) => this.setExcursion(excursion)).share();
    obs.subscribe();
    return obs;
  }

  stopEditing() {
    this.excursionStream.next(null);

    if (this.excursionUpdateSubscription) {
      this.excursionUpdateSubscription.unsubscribe();
      this.excursionUpdateSubscription = null;
    }
  }

  patchExcursion(values: any): Observable<Excursion> {
    return this.excursionObs.first().switchMap(excursion => {
      each(values, (value, key) => {
        excursion[key] = value;
      });

      this.excursionStream.next(excursion);
      return this.excursionObs.first();
    });
  }

  private initExcursionForm() {
    this.excursionForm = this.formBuilder.group({
      id: [
        ''
      ],
      trailHref: [
        '',
        Validators.required
      ],
      name: [
        '',
        Validators.maxLength(60)
      ],
      plannedAt: [
        '',
        Validators.required
      ],
      participantsCount: [
        0
      ],
      themes: [
        []
      ],
      zoneHrefs: [
        []
      ]
    });
  }

  private updateExcursionForm(excursion: Excursion) {
    const plannedAt = new Date(excursion.plannedAt);
    this.excursionForm.patchValue({
      id: excursion.id,
      name: excursion.name,
      trailHref: excursion.trailHref,
      plannedAt: {
        date: {
          year: plannedAt.getFullYear(),
          month: plannedAt.getMonth() + 1,
          day: plannedAt.getDate()
        },
        jsdate: plannedAt
      },
      themes: excursion.themes,
      zoneHrefs: excursion.zoneHrefs
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
      this.excursionsService.update(excursion, retrieveExcursionParams).subscribe(excursion => this.setExcursion(excursion));
    }
  }

  private processFormValues(values) {
    delete values.participantsCount;

    if (values.plannedAt) {
      values.plannedAt = moment(values.plannedAt.jsdate).startOf('day').toDate();
    }

    values.themes = values.themes.sort();
    values.zoneHrefs = values.zoneHrefs.sort();

    return values;
  }

}
