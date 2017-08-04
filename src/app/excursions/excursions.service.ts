import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../api';
import { Excursion } from '../models';
import { applyPaginationParams, PaginationParams, PaginatedResponse } from '../utils/api';

@Injectable()
export class ExcursionsService {

  constructor(private api: ApiService) {
  }

  create(excursion: Excursion, params?: RetrieveExcursionParams): Observable<Excursion> {
    return this.api
      .post(`/excursions`, excursion.toJson())
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

  count(params: RetrieveExcursionParams = {}): Observable<PaginatedResponse<Excursion>> {
    return this.api
      .head(`/excursions`)
      .modify(this.api.paramsModifier<RetrieveExcursionParams>(applyRetrieveExcursionParams, params))
      .execute()
      .map(res => PaginatedResponse.head<Excursion>(res));
  }

  retrieve(id: string, params?: RetrieveExcursionParams): Observable<Excursion> {
    return this.api
      .get(`/excursions/${id}`)
      .modify(this.api.paramsModifier<RetrieveExcursionParams>(applyRetrieveExcursionParams, params))
      .execute()
      .map(res => new Excursion(res.json()));
  }

  update(excursion: Excursion, params?: RetrieveExcursionParams): Observable<Excursion> {
    return this.api
      .patch(`/excursions/${excursion.id}`, excursion.toJson())
      .modify(this.api.paramsModifier<RetrieveExcursionParams>(applyRetrieveExcursionParams, params))
      .execute()
      .map(res => new Excursion(res.json()));
  }

}

export interface RetrieveExcursionParams {
  creators?: string[];
  plannedAtGte?: Date;
  plannedAtLt?: Date;
  search?: string;
  includeCreator?: boolean;
  includeTrail?: boolean;
}

export interface RetrievePaginatedExcursionsParams extends PaginationParams, RetrieveExcursionParams {
}

function applyRetrievePaginatedExcursionsParams(params: RetrievePaginatedExcursionsParams, options: RequestOptions) {
  applyPaginationParams(params, options);
  applyRetrieveExcursionParams(params, options);
}

function applyRetrieveExcursionParams(params: RetrieveExcursionParams, options: RequestOptions) {
  if (params.creators) {
    params.creators.forEach(creator => options.search.append('creator', creator));
  }

  if (params.plannedAtGte) {
    options.search.append('plannedAtGte', params.plannedAtGte.toISOString());
  }

  if (params.plannedAtLt) {
    options.search.append('plannedAtLt', params.plannedAtLt.toISOString());
  }

  if (params.search) {
    options.search.append('search', params.search);
  }

  if (params.includeCreator) {
    options.search.append('include', 'creator');
  }

  if (params.includeTrail) {
    options.search.append('include', 'trail');
  }
}
