import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectComponent } from 'ng-select/dist/select.component';
import every from 'lodash/every';
import reduce from 'lodash/reduce';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { Excursion, Trail } from '../models';
import { TrailsService } from '../trails';
import { EditExcursionService } from './edit-excursion.service';

@Component({
  selector: 'bio-edit-excursion-details-step',
  templateUrl: './edit-excursion-details-step.component.html'
})
export class EditExcursionDetailsStepComponent implements AfterViewInit, OnInit {

  excursion: Excursion;
  excursionForm: FormGroup;
  trailChoices: Array<{ [s: string]: string; }>;

  @ViewChild('trailHrefSelect')
  private trailHrefSelect: SelectComponent;
  private viewInitialized: BehaviorSubject<boolean>;

  private datepickerOptions: INgxMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    dayLabels: { mo: 'Lun', tu: 'Mar', we: 'Mer', th: 'Jeu', fr: 'Ven', sa: 'Sam', su: 'Dim' },
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
    monthSelector: false,
    yearSelector: false,
    monthLabels: { 1: 'Janvier', 2: 'Février', 3: 'Mars', 4: 'Avril', 5: 'Mai', 6: 'Juin', 7: 'Juillet', 8: 'Août', 9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre' },
    todayBtnTxt: 'Aujourd\'hui'
  };

  constructor(private editExcursionService: EditExcursionService, private trailsService: TrailsService) {
    this.viewInitialized = new BehaviorSubject(false);
  }

  ngOnInit() {

    // Retrieve the shared form from the edition service
    const initObs = this.editExcursionService.excursionObs.first().do((excursion: Excursion) => {
      this.excursion = excursion;
      this.excursionForm = this.editExcursionService.excursionForm;
    });

    // Select a default trail once the view & form have been initialized and the list of trails has been loaded
    Observable
      .combineLatest(initObs, this.viewInitialized.asObservable(), this.loadTrails())
      .filter(results => every(results))
      .first()
      .subscribe(() => this.selectDefaultTrail());
  }

  ngAfterViewInit() {
    this.viewInitialized.next(true);
  }

  loadTrails(): Observable<Trail[]> {
    return this.trailsService.retrieveAll().do(trails => {
      this.trailChoices = reduce(trails, (memo, trail) => {
        memo.push({
          value: trail.href,
          label: trail.name
        });

        return memo;
      }, []);
    });
  }

  selectDefaultTrail() {
    if (!this.excursionForm.controls.trailHref.value) {
      this.excursionForm.controls.trailHref.setValue(this.trailChoices[0].value);
    }
  }

}
