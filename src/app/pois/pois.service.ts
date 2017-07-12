import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Poi, Trail } from '../models';
import { retrieveAllRecursive } from '../utils/api';

@Injectable()
export class PoisService {

  constructor(private api: BioApiService) {
  }

  retrieveAll(trail: Trail, params?: RetrievePoiParams, batchSize: number = 100): Observable<Poi[]> {
    return this.retrieveAllRecursive(trail, params, batchSize);
  }

  private retrieveAllRecursive(trail: Trail, params: RetrievePoiParams, limit: number, offset: number = 0, records: Poi[] = []): Observable<Poi[]> {
    return retrieveAllRecursive(
      this.api
        .get(`/trails/${trail.id}/pois`)
        .modify(applyRetrievePoiParams.bind(undefined, params)),
      data => new Poi(data)
    );
  }

}

export interface RetrievePoiParams {
  zones?: string[];
}

function applyRetrievePoiParams(params: RetrievePoiParams, options: RequestOptions) {
  if (!params) {
    return;
  }

  if (params.zones) {
    params.zones.forEach(zone => options.search.append('zone', zone));
  }
}
