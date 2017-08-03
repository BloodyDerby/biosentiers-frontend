import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api';
import { Installation, InstallationEvent } from '../models';
import { applyPaginationParams, PaginatedResponse, PaginationParams } from '../utils/api';

@Injectable()
export class InstallationEventsService {

  constructor(private api: BioApiService) {
  }

  retrievePaginated(installation: Installation, params?: RetrievePaginatedInstallationEventsParams): Observable<PaginatedResponse<InstallationEvent>> {
    return this.api
      .get(`/installations/${installation.id}/events`)
      .modify(this.api.paramsModifier<RetrievePaginatedInstallationEventsParams>(applyRetrievePaginatedInstallationEventsParams, params))
      .execute()
      .map(res => new PaginatedResponse<InstallationEvent>(res, data => new InstallationEvent(data)));
  }

  retrieve(id: string): Observable<InstallationEvent> {
    return this.api
      .get(`/installation-events/${id}`)
      .execute()
      .map(res => new InstallationEvent(res.json()));
  }

}

export interface RetrieveInstallationEventParams {
}

export interface RetrievePaginatedInstallationEventsParams extends PaginationParams, RetrieveInstallationEventParams {
}

function applyRetrievePaginatedInstallationEventsParams(params: RetrievePaginatedInstallationEventsParams, options: RequestOptions) {
  applyPaginationParams(params, options);
  applyRetrieveInstallationEventParams(params, options);
}

function applyRetrieveInstallationEventParams(params: RetrieveInstallationEventParams, options: RequestOptions) {
  // nothing to do yet
}
