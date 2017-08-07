import { Response } from '@angular/http';
import every from 'lodash/every';
import isArray from 'lodash/isArray';
import some from 'lodash/some';
import { RequestBuilder } from 'ng-request-builder';
import { Observable } from 'rxjs/Rx';

export function hasError(res: Response, expected: any): boolean {

  const body = res.json();
  if (!isArray(body.errors)) {
    return false;
  }

  return some(body.errors, error => {
    return every(expected, (value, key) => {
      return error[key] === value;
    });
  });
}
