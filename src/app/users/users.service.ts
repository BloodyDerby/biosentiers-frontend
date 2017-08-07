import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { apiQueryParamsModifier, ApiService, PaginatedResponse, PaginationParams } from '../api';
import { User } from '../models';

@Injectable()
export class UsersService {

  constructor(private api: ApiService) {
  }

  create(user: UserCreation, authToken?: string): Observable<User> {

    let builder = this.api.post('/users', user);
    if (authToken) {
      builder = builder.header('Authorization', `Bearer ${authToken}`);
    }

    return builder
      .execute()
      .map(res => new User(res.json()));
  }

  retrieve(id: string): Observable<User> {
    return this.api
      .get(`/users/${id}`)
      .execute()
      .map(res => new User(res.json()));
  }

  retrievePaginated(params?: RetrievePaginatedUsersParams): Observable<PaginatedResponse<User>> {
    return this.api
      .get('/users')
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => new PaginatedResponse<User>(res, data => new User(data)));
  }

  update(user: IdentifiedUserUpdate): Observable<User> {
    return this.api
      .patch(`/users/${user.id}`, user)
      .execute()
      .map(res => new User(res.json()));
  }

  updateMe(user: UserUpdate, authToken?: string): Observable<User> {

    let builder = this.api.patch('/me', user);
    if (authToken) {
      builder = builder.header('Authorization', `Bearer ${authToken}`);
    }

    return builder
      .execute()
      .map(res => new User(res.json()));
  }

}

export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

type UserCreation = User | UserRegistration;

export interface UserActivation {
  id: string;
  active: boolean;
}

export interface UserPasswordChange {
  password: string;
  previousPassword: string;
}

export interface IdentifiedUserPasswordChange extends UserPasswordChange {
  id: string;
}

export interface AdminPasswordChange {
  id: string;
  password: string;
}

export interface UserPasswordReset {
  password: string;
}

type UserUpdate = User | UserPasswordChange | UserPasswordReset;
type IdentifiedUserUpdate = User | UserActivation | IdentifiedUserPasswordChange | AdminPasswordChange;

export interface RetrieveUserParams {
  email?: string;
  search?: string;
}

export interface RetrievePaginatedUsersParams extends PaginationParams, RetrieveUserParams {
}
