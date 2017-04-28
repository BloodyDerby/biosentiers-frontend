import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { BioThemes } from '../data/themes';
import { BioZones } from '../data/zones';
import { Excursion } from '../models/excursion';
import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { Router } from '@angular/router';

@Injectable()
export class EditExcursionService {

  private excursion: BehaviorSubject<Excursion>;
  public excursion$: Observable<Excursion>;

  constructor(private excursionsService: BioExcursionsService, private router: Router) {
    this.excursion = new BehaviorSubject(null);
    this.excursion$ = this.excursion.asObservable();
  }

  edit(id?: string) {
    if (id) {
      this.loadExcursion(id);
    } else {
      this.setExcursion(new Excursion({
        themes: BioThemes.map(theme => theme.id),
        zones: BioZones.features.map((feature, i) => i)
      }));
    }
  }

  save() {
    const excursion = this.getExcursion();
    if (excursion && excursion.id) {
      this.excursionsService.update(excursion).subscribe(excursion => {
        // Nothing to do
      });
    } else if (excursion) {
      this.excursionsService.create(excursion).subscribe(excursion => {
        this.router.navigate([ '/excursions', excursion.id, 'edit' ])
      });
    }
  }

  stopEditing() {
    this.excursion.next(null);
  }

  loadExcursion(excursionId: string) {

    var params: RetrieveExcursionParams = {
      includeCreator: true,
      includeTrail: true
    };

    this.excursionsService.retrieve(excursionId, params).subscribe(excursion => {
      this.excursion.next(excursion);
    });
  }

  getExcursion() {
    return this.excursion.getValue();
  }

  setExcursion(excursion: Excursion) {
    this.excursion.next(excursion);
  }

}
