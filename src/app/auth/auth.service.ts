import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { RequestBuilder } from 'ng-request-builder';
import { Observable } from 'rxjs/Observable';

import { BioStorageService } from '../utils/storage/storage.service';
import { User } from '../models/user';

@Injectable()
export class BioAuthService {

  user$: Observable<User>;

  private token: string;
  private user: BehaviorSubject<User>;

  constructor(private http: Http, private storage: BioStorageService) {
    this.user = new BehaviorSubject(null);
    this.user$ = this.user.asObservable();
    this.initialize();
  }

  authenticate(credentials: any) {

    const url = '/api/auth';

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return this.http
      .post(url, credentials, { headers: headers })
      .map((res) => res.json())
      .do((authData) => this.setAuthData(authData, true))
      .map(() => this.user.getValue());
  }

  unauthenticate() {
    const user = this.user.getValue();
    this.unsetAuthData();
    // FIXME: redirect user to home if current page is protected
    return user;
  }

  addAuthorization(requestBuilder: RequestBuilder) {
    if (!this.token) {
      return false;
    }

    requestBuilder.setHeader('Authorization', 'Bearer ' + this.token);
    return true;
  }

  private setAuthData(authData: any, save: boolean) {
    this.token = authData.token;
    this.user.next(new User(authData.user));

    if (save) {
      this.storage.set('biosentiers.auth', authData);
    }
  }

  private unsetAuthData() {
    delete this.token;
    this.user.next(null);
    this.storage.remove('biosentiers.auth');
  }

  private initialize() {
    const savedAuthData = this.storage.get('biosentiers.auth');
    if (savedAuthData) {
      this.setAuthData(savedAuthData, false);
    }
  }

}
