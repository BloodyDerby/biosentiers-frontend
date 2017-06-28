import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import extend from 'lodash/extend';
import omit from 'lodash/omit';
import { Observable, ReplaySubject, Subscription } from 'rxjs/Rx';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { Excursion } from '../models/excursion';

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
      this.updateExcursionForm(excursion)

      this.excursionUpdateSubscription = this.excursionForm
        .valueChanges
        .skip(1)
        .filter(values => values.id && this.excursionForm.valid)
        .distinctUntilChanged()
        .debounceTime(1000)
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

  save() {
    this.excursionObs.first().subscribe((excursion) => {
      if (excursion.id) {
        this.excursionsService.update(excursion).subscribe(excursion => {});
      } else {
        this.excursionsService.create(excursion).subscribe(excursion => {
          this.router.navigate([ '/excursions', excursion.id, 'edit' ])
        });
      }
    });
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

    var params: RetrieveExcursionParams = {
      includeCreator: true,
      includeTrail: true
    };

    this.excursionsService.retrieve(excursionId, params).subscribe(excursion => this.setExcursion(excursion));
  }

  private setExcursion(excursion: Excursion) {
    this.excursionStream.next(excursion);
    this.excursionForm.patchValue({
      name: excursion.name
      // FIXME: update excursion date
    });
  }

  private updateExcursion(values) {
    values.plannedAt = values.plannedAt.jsdate;
    this.excursionsService.update(new Excursion(values)).subscribe(excursion => {});
  }

}
