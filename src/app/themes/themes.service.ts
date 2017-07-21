import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Theme } from '../models/theme';

@Injectable()
export class BioThemesService {

  constructor(private api: BioApiService) {
  }

  retrieveAll(params: RetrieveThemesParams = {}): Observable<Theme[]> {
    return this.api
      .get('/themes')
      .modify(applyRetrieveThemesParams.bind(undefined, params))
      .execute()
      .map(res => res.json().map(data => new Theme(data)));
  }

}

export interface RetrieveThemesParams {
  names?: string[];
}

// TODO: investigate decorators to auto-generate this
function applyRetrieveThemesParams(params: RetrieveThemesParams, options: RequestOptions) {
  if (params.names) {
    params.names.forEach(name => options.search.append('name', name));
  }
}
