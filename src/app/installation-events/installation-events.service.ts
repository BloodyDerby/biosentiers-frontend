import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { apiQueryParamsModifier, ApiService, PaginatedResponse, PaginationParams } from '../api';
import { Installation, InstallationEvent } from '../models';

@Injectable()
export class InstallationEventsService {

  constructor(private api: ApiService) {
  }

  retrievePaginated(installation: Installation, params?: RetrievePaginatedInstallationEventsParams): Observable<PaginatedResponse<InstallationEvent>> {
    return this.api
      .get(`/installations/${installation.id}/events`)
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => new PaginatedResponse<InstallationEvent>(res, data => new InstallationEvent(data)));
  }

  retrieve(id: string, params?: RetrieveInstallationEventParams): Observable<InstallationEvent> {
    return this.api
      .get(`/installation-events/${id}`)
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => new InstallationEvent(res.json()));
  }

}

export interface RetrieveInstallationEventParams {
}

export interface RetrievePaginatedInstallationEventsParams extends PaginationParams, RetrieveInstallationEventParams {
}
