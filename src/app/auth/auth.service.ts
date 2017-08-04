import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestBuilder } from 'ng-request-builder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { getRouteRequiredRoles } from './auth.utils';
import { StorageService } from '../storage';
import { roles, User } from '../models';

@Injectable()
export class AuthService {

  userObs: Observable<User>;

  private currentUser: User;
  private token: string;
  private userSubject: BehaviorSubject<User>;

  constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router, private storageService: StorageService) {
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

    requestBuilder.modifyHeaders((headers: Headers) => {
      if (!headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${this.token}`);
      }
    });

    return true;
  }

  updateUser(user: User, save: boolean) {
    if (!this.currentUser) {
      throw new Error('No user is authenticated');
    }

    this.userSubject.next(user);

    if (save) {
      const authData = this.getAuthData();
      authData.user = user;
      this.saveAuthData(authData);
    }
  }

  private setAuthData(authData: any, save: boolean) {
    this.token = authData.token;
    this.userSubject.next(new User(authData.user));

    if (save) {
      this.saveAuthData(authData);
    }
  }

  private unsetAuthData() {
    delete this.token;
    this.userSubject.next(null);
    this.deleteAuthData();
  }

  private initializeAuthData() {
    const savedAuthData = this.getAuthData();
    if (savedAuthData) {
      this.setAuthData(savedAuthData, false);
    }
  }

  private getAuthData() {
    return this.storageService.get('biosentiers.auth');
  }

  private saveAuthData(authData: any) {
    this.storageService.set('biosentiers.auth', authData);
  }

  private deleteAuthData() {
    this.storageService.remove('biosentiers.auth');
  }
}
