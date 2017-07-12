import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Trail } from '../models/trail';
import { Zone } from '../models/zone';

@Injectable()
export class BioZonesService {

  constructor(private api: BioApiService) {
  }

  retrieveAll(trail: Trail, params: RetrieveZonesParams = {}): Observable<Zone[]> {
    return this.api
      .get(`/trails/${trail.id}/zones`)
      .modify(applyRetrieveZonesParams.bind(undefined, params))
      .execute()
      .map(res => res.json().map(data => new Zone(data)));
  }

}

export interface RetrieveZonesParams {
  hrefs?: string[];
}

// TODO: investigate decorators to auto-generate this
function applyRetrieveZonesParams(params: RetrieveZonesParams, options: RequestOptions) {
  if (params.hrefs) {
    params.hrefs.forEach(href => options.search.append('href', href));
  }
}
