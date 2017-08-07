import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { apiQueryParamsModifier, ApiService, PaginatedResponse, PaginationParams } from '../api';
import { Installation } from '../models';

@Injectable()
export class InstallationsService {

  constructor(private api: ApiService) {
  }

  retrievePaginated(params?: RetrievePaginatedInstallationsParams): Observable<PaginatedResponse<Installation>> {
    return this.api
      .get('/installations')
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => new PaginatedResponse<Installation>(res, data => new Installation(data)));
  }

  retrieve(id: string, params?: RetrieveInstallationParams): Observable<Installation> {
    return this.api
      .get(`/installations/${id}`)
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => new Installation(res.json()));
  }

}

export interface RetrieveInstallationParams {
  search?: string;
}

export interface RetrievePaginatedInstallationsParams extends PaginationParams, RetrieveInstallationParams {
}
