import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { apiQueryParamsModifier, ApiService } from '../api';
import { Trail, Zone } from '../models';

@Injectable()
export class ZonesService {

  constructor(private api: ApiService) {
  }

  retrieveAll(trail: Trail, params?: RetrieveZonesParams): Observable<Zone[]> {
    return this.api
      .get(`/trails/${trail.id}/zones`)
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => res.json().map(data => new Zone(data)));
  }

}

export interface RetrieveZonesParams {
  href?: string | string[];
}
