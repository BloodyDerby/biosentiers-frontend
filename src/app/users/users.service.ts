import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { User } from '../models';

@Injectable()
export class UsersService {

  constructor(private api: BioApiService) {
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

export interface UserPasswordChange {
  id: string;
  password: string;
  previousPassword: string;
}

export interface IdentifiedUserPasswordChange extends UserPasswordChange {
  id: string;
}

export interface UserPasswordReset {
  password: string;
}

export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

type UserCreation = User | UserRegistration;
type UserUpdate = User | UserPasswordChange | UserPasswordReset;
type IdentifiedUserUpdate = User | IdentifiedUserPasswordChange;
