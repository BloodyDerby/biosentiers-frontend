import { AbstractControl, FormGroup } from '@angular/forms';
import each from 'lodash/each';
import { Observable } from 'rxjs/Rx';

export function markAsPristine(control: AbstractControl | FormGroup) {
  control.setErrors(null);
  control.markAsPristine();

  if (control instanceof FormGroup) {
    each(control.controls, control => markAsPristine(control));
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
