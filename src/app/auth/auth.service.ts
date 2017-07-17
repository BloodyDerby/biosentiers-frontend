import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestBuilder } from 'ng-request-builder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { getRouteRequiredRoles } from './auth.utils';
import { BioStorageService } from '../utils/storage/storage.service';
import { roles, User } from '../models';

@Injectable()
export class BioAuthService {

  userObs: Observable<User>;

  private currentUser: User;
  private token: string;
  private userSubject: BehaviorSubject<User>;

  constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router, private storage: BioStorageService) {
    this.userSubject = new BehaviorSubject(null);
    this.userObs = this.userSubject.asObservable();
    this.userObs.subscribe(user => this.currentUser = user);

    this.initializeAuthData();
  }

  authenticate(credentials: any) {

    const url = '/api/auth';

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return this.http
      .post(url, credentials, { headers: headers })
      .map((res) => res.json())
      .do((authData) => this.setAuthData(authData, true))
      .map(() => this.userSubject.getValue());
  }

  unauthenticate() {

    // Log out
    this.unsetAuthData();

    // Navigate to the home page if the current route requires any role
    const requiredRoles = getRouteRequiredRoles(this.activatedRoute.snapshot);
    if (requiredRoles.length) {
      this.router.navigate([ '' ]);
    }
  }

  hasRole(role: string): boolean {
    return this.currentUser && this.currentUser.hasRole(role);
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
    this.userSubject.next(new User(authData.user));

    if (save) {
      this.storage.set('biosentiers.auth', authData);
    }
  }

  private unsetAuthData() {
    delete this.token;
    this.userSubject.next(null);
    this.storage.remove('biosentiers.auth');
  }

  private initializeAuthData() {
    const savedAuthData = this.storage.get('biosentiers.auth');
    if (savedAuthData) {
      this.setAuthData(savedAuthData, false);
    }
  }
}
