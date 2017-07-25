import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import reduce from 'lodash/reduce';

import { AuthViewService } from '../auth';
import URI from '../utils/uri';

@Component({
  selector: 'bio-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.styl']
})
export class ErrorComponent {
  auth: AuthViewService;

  @Input()
  error: Error | Response;

  @Input()
  message: string;

  constructor(authViewService: AuthViewService) {
    this.auth = authViewService;
  }

  isHttpError() {
    return this.error instanceof Response;
  }

  get errorMessage() {
    if (this.message) {
      return this.message;
    } else if (this.error instanceof Response) {
      return "Les données n'ont pas pu être chargées. Veuillez réessayer plus tard.";
    } else {
      return "Une erreur s'est produite. Veuillez réessayer plus tard.";
    }
  }

  get httpErrorUrl() {
    return this.error instanceof Response ? new URI(this.error.url).path() : undefined;
  }

  get httpErrorQueryParams() {
    if (!(this.error instanceof Response)) {
      return [];
    }

    return reduce(new URI(this.error.url).query(true), (memo, values, param) => {

      const valuesArray = Array.isArray(values) ? values : [ values ];
      valuesArray.forEach(value => {
        memo.push({
          name: param,
          value: value
        });
      });

      return memo;
    }, []);
  }

  get errorDetails() {
    if (this.error instanceof Response) {

      const headers = this.error.headers;
      const contentType = headers ? headers.get('Content-Type') : undefined;
      if (!contentType || !contentType.match(/^application\/json/)) {
        return this.error.text();
      }

      try {
        return JSON.stringify(this.error.json(), undefined, 2);
      } catch (err) {
        return this.error.text();
      }
    } else {
      return this.error.stack;
    }
  }

}
