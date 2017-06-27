import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Trail } from '../models/trail';
import { Zone } from '../models/zone';

@Injectable()
export class BioZonesService {

  constructor(private api: BioApiService) {
  }

  retrieveAll(trail: Trail): Observable<Zone[]> {
    return this.api
      .get(`/trails/${trail.id}/zones`)
      .execute()
      .map(res => res.json().map(data => new Zone(data)));
  }

}
