import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import debounce from 'lodash/debounce';
import { Observable, Subject } from 'rxjs/Rx';

import { debounceAsyncValidator } from '../forms';
import { UsersService } from './users.service';

@Injectable()
export class UserValidationsService {

  constructor(private usersService: UsersService) {
  }

  emailAvailable(): AsyncValidatorFn {
    return debounceAsyncValidator<string>(this.checkEmailAvailable.bind(this));
  }

  private checkEmailAvailable(email: string): Observable<ValidationErrors | null> {
    return this.usersService.retrievePaginated({
      email: email
    }).map(res => res.records).map(users => {
      if (!users.length) {
        return null;
      }

      return {
        emailAvailable: true
      };
    });
  }
}
