import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { apiQueryParamsModifier, ApiService } from '../api';
import { Theme } from '../models';

@Injectable()
export class ThemesService {

  constructor(private api: ApiService) {
  }

  retrieveAll(params?: RetrieveThemesParams): Observable<Theme[]> {
    return this.api
      .get('/themes')
      .modify(apiQueryParamsModifier(params))
      .execute()
      .map(res => res.json().map(data => new Theme(data)));
  }

}

export interface RetrieveThemesParams {
  name?: string | string[];
}
