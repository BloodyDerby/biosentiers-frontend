import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../api';
import { Installation } from '../models';
import { applyPaginationParams, PaginatedResponse, PaginationParams } from '../utils/api';

@Injectable()
export class InstallationsService {

  constructor(private api: ApiService) {
  }

  retrievePaginated(params?: RetrievePaginatedInstallationsParams): Observable<PaginatedResponse<Installation>> {
    return this.api
      .get('/installations')
      .modify(this.api.paramsModifier<RetrievePaginatedInstallationsParams>(applyRetrievePaginatedInstallationsParams, params))
      .execute()
      .map(res => new PaginatedResponse<Installation>(res, data => new Installation(data)));
  }

  retrieve(id: string): Observable<Installation> {
    return this.api
      .get(`/installations/${id}`)
      .execute()
      .map(res => new Installation(res.json()));
  }

}

export interface RetrieveInstallationParams {
  search?: string;
}

export interface RetrievePaginatedInstallationsParams extends PaginationParams, RetrieveInstallationParams {
}

function applyRetrievePaginatedInstallationsParams(params: RetrievePaginatedInstallationsParams, options: RequestOptions) {
  applyPaginationParams(params, options);
  applyRetrieveInstallationParams(params, options);
}

function applyRetrieveInstallationParams(params: RetrieveInstallationParams, options: RequestOptions) {
  if (params.search) {
    options.search.append('search', params.search);
  }
}
