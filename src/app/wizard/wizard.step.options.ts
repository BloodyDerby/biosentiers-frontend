import { NavigationExtras } from '@angular/router/router';

import { CanActivateStep } from './wizard.step.can-activate';
import { StepIsEnabled } from './wizard.step.is-enabled';

export class WizardStepOptions {
  canActivate: CanActivateStep[];
  isEnabled: StepIsEnabled[];
  route: any[];
  routeExtras: NavigationExtras;

  constructor(canActivate?: CanActivateStep[], isEnabled?: StepIsEnabled[], route?: any[], routeExtras?: NavigationExtras) {
    this.canActivate = canActivate || [];
    this.isEnabled = isEnabled || [];
    this.route = route;
    this.routeExtras = routeExtras;
  }
}
