import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Trail } from '../models/trail';

@Injectable()
export class BioTrailsService {

  constructor(private api: BioApiService) {
  }

  retrieveAll(): Observable<Trail[]> {
    return this.api
      .get('/trails')
      .execute()
      .map(res => res.json().map(data => new Trail(data)));
  }

}
