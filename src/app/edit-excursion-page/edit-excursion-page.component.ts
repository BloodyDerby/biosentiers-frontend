import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { BioTrailsService } from '../trails/trails.service';
import { Excursion } from '../models/excursion';
import { Trail } from '../models/trail';
import { EditExcursionService } from './edit-excursion.service';
import { ComponentAddon } from '../utils/component-addon';
import { WizardComponent } from '../wizard/wizard.component';
import { WizardStep } from '../wizard/wizard.step';
import { CanActivateStep } from '../wizard/wizard.step.can-activate';
import { StepIsEnabled } from '../wizard/wizard.step.is-enabled';
import { WizardStepOptions } from '../wizard/wizard.step.options';
import { WizardStepRoute } from '../wizard/wizard.step.route';

@Component({
  selector: 'bio-edit-excursion-page',
  templateUrl: './edit-excursion-page.component.html',
  styleUrls: ['./edit-excursion-page.component.styl']
})
export class EditExcursionPageComponent implements OnInit {

  @ViewChild(WizardComponent)
  wizard: WizardComponent;

  excursion: Excursion;
  wizardSteps: WizardStep[];

  constructor(private cdr: ChangeDetectorRef, private editExcursionService: EditExcursionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.editExcursionService.edit(this.route.snapshot.params['id']);
    // TODO: watch excursion changes to update page title
    this.editExcursionService.excursionObs.first().subscribe((excursion) => {
      this.excursion = excursion;
      this.initWizard();
    });
  }

  ngOnDestroy() {
    this.editExcursionService.stopEditing();
  }

  initWizard() {

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

  excursionIsValid(): boolean {
    return this.editExcursionService.excursionForm.valid;
  }

  createExcursion(): Observable<Excursion> {
    return this.editExcursionService.save();
  }

  getExcursion(): Observable<Excursion> {
    return this.editExcursionService.excursionObs.first();
  }

  private getStepRoute(...additionalPathFragments): Observable<WizardStepRoute> {
    return this.editExcursionService.excursionObs.first().map(excursion => {
      return excursion.id ? new WizardStepRoute([ '/excursions', excursion.id, 'edit' ].concat(additionalPathFragments)) : undefined;
    });
  }

}

class ParticipantsStepIsEnabled extends ComponentAddon<EditExcursionPageComponent> implements StepIsEnabled {
  isEnabled(): boolean {
    return this.component.excursionIsValid();
  }
}

class CanActivateParticipantsStep extends ComponentAddon<EditExcursionPageComponent> implements CanActivateStep {
  canActivate(): Observable<boolean> {
    if (!this.component.excursionIsValid()) {
      return Observable.of(false);
    }

    return this.component.createExcursion().map(excursion => true);
  }
}

class ZonesStepIsEnabled extends ComponentAddon<EditExcursionPageComponent> implements StepIsEnabled {
  isEnabled(): Observable<boolean> {
    return this.component.getExcursion().map(excursion => excursion.participantsCount >= 1);
  }
}

class ThemesStepIsEnabled extends ComponentAddon<EditExcursionPageComponent> implements StepIsEnabled {
  isEnabled(): Observable<boolean> {
    return this.component.getExcursion().map(excursion => !!excursion.zoneHrefs.length);
  }
}
