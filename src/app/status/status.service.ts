import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { apiQueryParamsModifier, ApiService } from '../api';
import { Activity, ActivityInterval, ActivitySubject, Stats } from '../models';

@Injectable()
export class StatusService {

  constructor(private api: ApiService) { }

  retrieveActivity(params: RetrieveActivityParams = {}): Observable<Activity> {
    return this.api
      .get('/stats/activity')
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => res.json())
      .map(data => new Activity(data));
  }

  retrieveStats(): Observable<Stats> {
    return this.api
      .get('/stats')
      .execute()
      .map(res => res.json())
      .map(data => new Stats(data));
  }
}

export interface RetrieveActivityParams {
  interval?: ActivityInterval;
  subject?: ActivitySubject;
}
