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
import { EditExcursionDetailsStepComponent } from './edit-excursion-details-step.component';
import { EditExcursionPoisStepComponent } from './edit-excursion-pois-step.component';
import { EditExcursionParticipantsStepComponent } from './edit-excursion-participants-step.component';
import { WizardComponent } from '../wizard/wizard.component';
import { WizardStep } from '../wizard/wizard.step';
import { CanActivateStep } from '../wizard/wizard.step.can-activate';
import { StepIsEnabled } from '../wizard/wizard.step.is-enabled';
import { WizardStepOptions } from '../wizard/wizard.step.options';

class CanActivateParticipantsStep implements CanActivateStep {
  component: EditExcursionPageComponent;

  constructor(component: EditExcursionPageComponent) {
    this.component = component;
  }

  canActivate(): Observable<boolean> {
    return Observable.of(false);
  }
}

class ThemesStepIsEnabled implements StepIsEnabled {
  component: EditExcursionPageComponent;

  constructor(component: EditExcursionPageComponent) {
    this.component = component;
  }

  isEnabled(): boolean {
    return !!this.component.excursion && !!this.component.excursion.id;
  }
}

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
    this.editExcursionService.excursionObs.first().subscribe((excursion) => {
      this.excursion = excursion;
      this.initWizard();
    });
  }

  ngOnDestroy() {
    this.editExcursionService.stopEditing();
  }

  initWizard() {

    const baseRoute = [ '/excursions', this.excursion.id, 'edit' ];

    const component = this;

    this.wizardSteps = [
      new WizardStep('details', 'Détails', 'user', new WizardStepOptions([], [], baseRoute)),
      new WizardStep('participants', 'Participants', 'key', new WizardStepOptions([ new CanActivateParticipantsStep(this) ], [], baseRoute.concat([ 'participants' ]))),
      new WizardStep('themes', 'Thèmes & zones', 'twitter', new WizardStepOptions([ ], [ new ThemesStepIsEnabled(this) ], baseRoute.concat([ 'pois' ])))
    ];

    this.cdr.detectChanges();
  }

  private isParticipantsStepEnabled(): boolean {
    return !!this.excursion && !!this.excursion.id;
  }

  private isThemesStepEnabled(): boolean {
    return this.isParticipantsStepEnabled();
  }

}
