import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { apiQueryParamsModifier, ApiService, PaginatedResponse, PaginationParams, retrieveAllRecursive } from '../api';
import { Poi, Trail } from '../models';

@Injectable()
export class PoisService {

  constructor(private api: ApiService) {
  }

  count(trail: Trail, params?: RetrievePoiParams): Observable<PaginatedResponse<Poi>> {
    return this.api
      .head(`/trails/${trail.id}/pois`)
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => PaginatedResponse.head<Poi>(res));
  }

  retrieveAll(trail: Trail, params?: RetrievePoiParams, batchSize: number = 100, offset: number = 0): Observable<Poi[]> {

    const builder = this.api
      .get(`/trails/${trail.id}/pois`)
      .modify(apiQueryParamsModifier(params));

    return retrieveAllRecursive(builder, data => new Poi(data), batchSize, offset);
  }

}

export interface RetrievePoiParams {
  theme?: string | string[];
  zone?: string | string[];
}

export interface RetrievePaginatedPoiParams extends PaginationParams, RetrievePoiParams {
}
