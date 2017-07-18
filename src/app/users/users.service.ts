import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { User } from '../models';

@Injectable()
export class UsersService {

  constructor(private api: BioApiService) {
  }

  update(user: UserUpdate): Observable<User> {
    return this.api
      .patch(`/users/${user.id}`, user)
      .execute()
      .map(res => new User(res.json()));
  }

}

export interface UserPasswordChange {
  id: string;
  password: string;
  previousPassword: string;
}

type UserUpdate = User | UserPasswordChange;
