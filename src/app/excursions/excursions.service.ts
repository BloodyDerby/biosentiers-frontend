import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { apiQueryParamsModifier, ApiService, DateComparisonParam, PaginatedResponse, PaginationParams } from '../api';
import { AuthService } from '../auth';
import { Excursion } from '../models';

@Injectable()
export class ExcursionsService {

  constructor(private api: ApiService, private authService: AuthService) {
  }

  create(excursion: Excursion, params?: RetrieveExcursionParams): Observable<Excursion> {
    return this.api
      .post(`/excursions`, excursion.toJson())
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => new Excursion(res.json()));
  }

  retrievePaginated(params?: RetrievePaginatedExcursionsParams): Observable<PaginatedResponse<Excursion>> {
    return this.api
      .get('/excursions')
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => new PaginatedResponse<Excursion>(res, data => new Excursion(data)));
  }

  count(params: RetrieveExcursionParams = {}): Observable<PaginatedResponse<Excursion>> {
    return this.api
      .head(`/excursions`)
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => PaginatedResponse.head<Excursion>(res));
  }

  retrieve(id: string, params?: RetrieveExcursionParams): Observable<Excursion> {
    return this.api
      .get(`/excursions/${id}`)
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => new Excursion(res.json()));
  }

  update(excursion: Excursion, params?: RetrieveExcursionParams): Observable<Excursion> {
    return this.api
      .patch(`/excursions/${excursion.id}`, excursion.toJson())
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => new Excursion(res.json()));
  }

  getExcursionPageTitle(excursion: Excursion): string[] {

    const titleData = [ 'Sorties' ];
    if (this.authService.hasRole('admin')) {
      titleData.push(`${excursion.pageTitle} (${excursion.creator.fullName})`);
    } else {
      titleData.push(excursion.pageTitle);
    }

    return titleData;
  }

}

export interface RetrieveExcursionParams {
  creators?: string | string[];
  plannedAt?: DateComparisonParam | DateComparisonParam[];
  search?: string;
  includeCreator?: boolean;
  includeTrail?: boolean;
}

export interface RetrievePaginatedExcursionsParams extends PaginationParams, RetrieveExcursionParams {
}
