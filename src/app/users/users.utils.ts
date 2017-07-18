import { FormGroup, ValidatorFn } from '@angular/forms';

export function passwordConfirmationMustMatch(): ValidatorFn {
  return (form: FormGroup): {[key: string]: any} => {

    const password = form.get('password').value;
    const passwordConfirmation = form.get('passwordConfirmation').value;

    if (password && passwordConfirmation && password != passwordConfirmation) {
      return {
        passwordConfirmation: true
      };
    }
  };
}
