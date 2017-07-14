import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Excursion } from '../models/excursion';
import { applyPaginationParams, PaginationParams, PaginatedResponse } from '../utils/api';

@Injectable()
export class BioExcursionsService {

  constructor(private api: BioApiService) {
  }

  create(excursion: Excursion, params?: RetrieveExcursionParams): Observable<Excursion> {
    return this.api
      .post(`/excursions`, excursion)
      .modify(this.api.paramsModifier<RetrieveExcursionParams>(applyRetrieveExcursionParams, params))
      .execute()
      .map(res => new Excursion(res.json()));
  }

  retrievePaginated(params?: RetrievePaginatedExcursionsParams): Observable<PaginatedResponse<Excursion>> {
    return this.api
      .get('/excursions')
      .modify(this.api.paramsModifier<RetrievePaginatedExcursionsParams>(applyRetrievePaginatedExcursionsParams, params))
      .execute()
      .map(res => new PaginatedResponse<Excursion>(res, data => new Excursion(data)));
  }

  retrieve(id, params?: RetrieveExcursionParams): Observable<Excursion> {
    return this.api
      .get(`/excursions/${id}`)
      .modify(this.api.paramsModifier<RetrieveExcursionParams>(applyRetrieveExcursionParams, params))
      .execute()
      .map(res => new Excursion(res.json()));
  }

  update(excursion: Excursion, params?: RetrieveExcursionParams): Observable<Excursion> {
    return this.api
      .patch(`/excursions/${excursion.id}`, excursion)
      .modify(this.api.paramsModifier<RetrieveExcursionParams>(applyRetrieveExcursionParams, params))
      .execute()
      .map(res => new Excursion(res.json()));
  }

}

export interface RetrieveExcursionParams {
  includeCreator?: boolean;
  includeTrail?: boolean;
  search?: string;
}

export interface RetrievePaginatedExcursionsParams extends PaginationParams, RetrieveExcursionParams {
  offset?: number;
  limit?: number;
}

function applyRetrievePaginatedExcursionsParams(params: RetrievePaginatedExcursionsParams, options: RequestOptions) {
  applyPaginationParams(params, options);
  applyRetrieveExcursionParams(params, options);
}

function applyRetrieveExcursionParams(params: RetrieveExcursionParams, options: RequestOptions) {
  if (params.includeCreator) {
    options.search.append('include', 'creator');
  }

  if (params.includeTrail) {
    options.search.append('include', 'trail');
  }

  if (params.search) {
    options.search.append('search', params.search);
  }
}
