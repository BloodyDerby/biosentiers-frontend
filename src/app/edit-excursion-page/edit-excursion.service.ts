import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import extend from 'lodash/extend';
import omit from 'lodash/omit';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { BioThemes } from '../data/themes';
import { BioZones } from '../data/zones';
import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { Excursion } from '../models/excursion';

@Injectable()
export class EditExcursionService {

  public excursionForm: FormGroup;
  public excursionObs: Observable<Excursion>;
  private excursionStream: ReplaySubject<Excursion>;

  constructor(private excursionsService: BioExcursionsService, private formBuilder: FormBuilder, private router: Router) {

    this.excursionStream = new ReplaySubject(1);
    this.excursionObs = this.excursionStream.asObservable().filter(excursion => !!excursion);

    this.initExcursionForm();
    this.excursionObs.subscribe(excursion => this.updateExcursionForm(excursion));

    this.excursionForm.valueChanges
      .filter(values => values.id && this.excursionForm.valid)
      .distinctUntilChanged()
      .debounceTime(1000)
      .subscribe(values => this.updateExcursion(values));
  }

  edit(id?: string) {
    if (id) {
      this.loadExcursion(id);
    } else {
      this.setExcursion(new Excursion({
        themes: BioThemes.map(theme => theme.id),
        zones: BioZones.features.map((feature, i) => i),
        plannedAt: new Date().toISOString()
      }));
    }
  }

  save() {
    this.excursionStream.first().subscribe((excursion) => {
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
