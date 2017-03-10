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

  retrieveAll(): Observable<Excursion[]> {
    return this.api
      .get('/excursions')
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

}

export interface RetrieveExcursionParams {
  includeTrail?: boolean;
}

function applyRetrieveExcursionParams(params: RetrieveExcursionParams, options: RequestOptions) {
  if (params.includeTrail) {
    options.search.append('include', 'trail');
  }
}
