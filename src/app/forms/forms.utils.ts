import { AbstractControl, FormGroup } from '@angular/forms';
import each from 'lodash/each';
import { Observable } from 'rxjs/Rx';

export function reset(control: AbstractControl | FormGroup, value?: any) {
  control.setErrors(null);
  control.markAsPristine();

  if (control instanceof FormGroup) {
    if (value) {
      control.reset(value);
    }

    each(control.controls, control => reset(control));
  }
}

export function waitForValidations(form: AbstractControl): Observable<boolean> {
  if (form.status != 'PENDING') {
    return Observable.of(form.valid);
  }

  return form.statusChanges
    .filter(() => form.status != 'PENDING')
    .first()
    .map(() => form.valid);
}
