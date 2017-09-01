import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../api';
import { Stats, Trail } from '../models';

@Injectable()
export class StatusService {

  constructor(private api: ApiService) { }

  retrieveStats(): Observable<Stats> {
    return this.api
      .get('/stats')
      .execute()
      .map(res => res.json()).map(data => new Stats(data));
  }
}
