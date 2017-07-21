import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Poi, Trail } from '../models';
import { applyPaginationParams, PaginatedResponse, PaginationParams, retrieveAllRecursive } from '../utils/api';

@Injectable()
export class PoisService {

  constructor(private api: BioApiService) {
  }

  count(trail: Trail, params: RetrievePaginatedPoiParams = {}): Observable<PaginatedResponse<Poi>> {
    params.limit = 0;
    return this.api
      .get(`/trails/${trail.id}/pois`)
      .modify(options => applyRetrievePaginatedPoiParams(params, options))
      .execute()
      .map(res => new PaginatedResponse<Poi>(res, data => new Poi(data)));
  }

  retrieveAll(trail: Trail, params?: RetrievePoiParams, batchSize: number = 100): Observable<Poi[]> {
    return this.retrieveAllRecursive(trail, params, batchSize);
  }

  private retrieveAllRecursive(trail: Trail, params: RetrievePoiParams, limit: number, offset: number = 0, records: Poi[] = []): Observable<Poi[]> {
    return retrieveAllRecursive(
      this.api
        .get(`/trails/${trail.id}/pois`)
        .modify(options => applyRetrievePoiParams(params, options)),
      data => new Poi(data)
    );
  }

}

export interface RetrievePoiParams {
  themes?: string[];
  zones?: string[];
}

export interface RetrievePaginatedPoiParams extends PaginationParams, RetrievePoiParams {
}

function applyRetrievePoiParams(params: RetrievePoiParams, options: RequestOptions) {
  if (!params) {
    return;
  }

  if (params.themes) {
    params.themes.forEach(theme => options.search.append('theme', theme));
  }

  if (params.zones) {
    params.zones.forEach(zone => options.search.append('zone', zone));
  }
}

function applyRetrievePaginatedPoiParams(params: RetrievePaginatedPoiParams, options: RequestOptions) {
  applyPaginationParams(params, options);
  applyRetrievePoiParams(params, options);
}
