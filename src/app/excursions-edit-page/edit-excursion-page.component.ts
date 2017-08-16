import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { Observable } from 'rxjs/Rx';

import { EditExcursionService } from './edit-excursion.service';
import { Excursion, Trail } from '../models';
import { CanActivateStep, StepIsEnabled, WizardComponent, WizardStep, WizardStepOptions, WizardStepRoute } from '../wizard';

@Component({
  selector: 'bio-edit-excursion-page',
  templateUrl: './edit-excursion-page.component.html',
  styleUrls: ['./edit-excursion-page.component.styl']
})
export class EditExcursionPageComponent implements OnInit, OnDestroy {

  @ViewChild(WizardComponent)
  wizard: WizardComponent;

  excursion: Excursion;
  wizardError: Error;
  wizardSteps: WizardStep[];

  private wizardInitialized: boolean;

  constructor(private cdr: ChangeDetectorRef, private editExcursionService: EditExcursionService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.editExcursionService.edit(this.route.snapshot.params['id']);

    this.editExcursionService.excursionObs.first().subscribe((excursion) => {
      this.excursion = excursion;
      this.initWizard();
    });
  }

  ngDoCheck() {
    if (this.wizard && !this.wizardInitialized) {
      this.wizardInitialized = true;
      this.wizard.stepChangeErrorObs.subscribe(err => this.wizardError = err);
    }
  }

  ngOnDestroy() {
    this.editExcursionService.stopEditing();
  }

  excursionIsComplete(): Observable<boolean> {
    return this.editExcursionService.excursionObs.first().map(excursion => excursion.isComplete());
  }

  excursionIsValid(): boolean {
    return this.editExcursionService.excursionForm.valid;
  }

  createExcursion(): Observable<Excursion> {
    return this.editExcursionService.save();
  }

  getExcursion(): Observable<Excursion> {
    return this.editExcursionService.excursionObs.first();
  }

  private initWizard() {

    const component = this;

    this.wizardSteps = [
      new WizardStep(
        'details', 'Détails', 'info',
        new WizardStepOptions([], [], this.getStepRoute())
      ),
      new WizardStep(
        'participants', 'Participants', 'users',
        new WizardStepOptions(
          [ new ParticipantsStepIsEnabled(this) ],
          [ new CanActivateParticipantsStep(this) ],
          this.getStepRoute('participants')
        )
      ),
      new WizardStep(
        'zones', 'Zones', 'map-marker',
        new WizardStepOptions(
          [ new ZonesStepIsEnabled(this) ],
          [ ],
          this.getStepRoute('zones')
        )
      ),
      new WizardStep(
        'themes', 'Thèmes', 'leaf',
        new WizardStepOptions(
          [ new ThemesStepIsEnabled(this) ],
          [],
          this.getStepRoute('themes')
        )
      )
    ];

    this.cdr.detectChanges();
  }

  private getStepRoute(...additionalPathFragments): Observable<WizardStepRoute> {
    return this.editExcursionService.excursionObs.first().map(excursion => {
      return excursion.id ? new WizardStepRoute([ '/excursions', excursion.id, 'edit' ].concat(additionalPathFragments)) : undefined;
    });
  }

}

export abstract class EditExcursionPageAddon {
  component: EditExcursionPageComponent;

  constructor(component: EditExcursionPageComponent) {
    this.component = component;
  }
}

class ParticipantsStepIsEnabled extends EditExcursionPageAddon implements StepIsEnabled {
  isEnabled(): boolean {
    return this.component.excursionIsValid();
  }
}

class CanActivateParticipantsStep extends EditExcursionPageAddon implements CanActivateStep {
  canActivate(): Observable<boolean> {
    if (!this.component.excursionIsValid()) {
      return Observable.of(false);
    }

    return this.component.createExcursion().map(excursion => true);
  }
}

class ZonesStepIsEnabled extends EditExcursionPageAddon implements StepIsEnabled {
  isEnabled(): Observable<boolean> {
    return this.component.getExcursion().map(excursion => excursion.participantsCount >= 1);
  }
}

class ThemesStepIsEnabled extends EditExcursionPageAddon implements StepIsEnabled {
  isEnabled(): Observable<boolean> {
    return this.component.getExcursion().map(excursion => !!excursion.zoneHrefs.length);
  }
}
