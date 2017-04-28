import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Excursion } from '../models/excursion';

@Injectable()
export class BioExcursionsService {

  constructor(private api: BioApiService) {
  }

  create(excursion): Observable<Excursion> {
    return this.api
      .post(`/excursions`, excursion)
      .execute()
      .map(res => new Excursion(res.json()));
  }

  retrieveAll(params?: RetrieveExcursionParams): Observable<Excursion[]> {
    return this.api
      .get('/excursions')
      .modify(this.api.paramsModifier<RetrieveExcursionParams>(applyRetrieveExcursionParams, params))
      .execute()
      .map(res => res.json().map(data => new Excursion(data)));
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
}

function applyRetrieveExcursionParams(params: RetrieveExcursionParams, options: RequestOptions) {
  if (params.includeCreator) {
    options.search.append('include', 'creator');
  }

  if (params.includeTrail) {
    options.search.append('include', 'trail');
  }
}
