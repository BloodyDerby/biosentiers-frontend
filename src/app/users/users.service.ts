import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { User } from '../models';

@Injectable()
export class UsersService {

  constructor(private api: BioApiService) {
  }

  update(user: User): Observable<User> {
    return this.api
      .patch(`/users/${user.id}`, user)
      .execute()
      .map(res => new User(res.json()));
  }

}
