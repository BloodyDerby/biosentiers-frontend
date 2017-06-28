import { Observable } from 'rxjs/Rx';

import { WizardStep } from './wizard.step';

export interface CanActivateStep {
  canActivate(step: WizardStep): Observable<boolean>|Promise<boolean>|boolean;
}
