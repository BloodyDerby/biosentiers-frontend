import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import each from 'lodash/each';
import { Observable, Subject } from 'rxjs/Rx';

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

export function debounceAsyncValidator<T>(validator: (value: T) => Observable<ValidationErrors | null>, time: number = 750): AsyncValidatorFn {

  // This stream will be used to terminate previously running validators
  const changedSubject = new Subject<any>();

  return (control: AbstractControl): Observable<ValidationErrors | null> => {

    // Signal the previous validator (if any) to terminate
    changedSubject.next();

    return control
      .valueChanges
      .debounceTime(time)
      .distinctUntilChanged()
      .takeUntil(changedSubject.asObservable())
      .take(1)
      .switchMap(value => validator(value));
  }
}
