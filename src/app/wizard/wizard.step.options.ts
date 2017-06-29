import { Observable } from 'rxjs/Rx';

import { toObservable } from '../utils/async';
import { CanActivateStep } from './wizard.step.can-activate';
import { StepIsEnabled } from './wizard.step.is-enabled';
import { WizardStepRoute } from './wizard.step.route';

export class WizardStepOptions {
  isEnabled: StepIsEnabled[];
  canActivate: CanActivateStep[];
  route: Observable<WizardStepRoute>;

  constructor(isEnabled?: StepIsEnabled[], canActivate?: CanActivateStep[], route?: Observable<WizardStepRoute> | Promise<WizardStepRoute> | WizardStepRoute) {
    this.isEnabled = isEnabled || [];
    this.canActivate = canActivate || [];
    this.route = route ? toObservable<WizardStepRoute>(route) : undefined;
  }
}
