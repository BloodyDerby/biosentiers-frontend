import { Observable } from 'rxjs/Rx';

import { WizardStep } from './wizard.step';

export interface StepIsEnabled {
  isEnabled(step: WizardStep): Observable<boolean>|Promise<boolean>|boolean;
}
