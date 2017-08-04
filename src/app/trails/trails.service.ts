import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../api';
import { Trail } from '../models';

@Injectable()
export class TrailsService {

  constructor(private api: ApiService) {
  }

  retrieveAll(): Observable<Trail[]> {
    return this.api
      .get('/trails')
      .execute()
      .map(res => res.json().map(data => new Trail(data)));
  }

}
