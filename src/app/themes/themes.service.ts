import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Theme } from '../models/theme';

@Injectable()
export class BioThemesService {

  constructor(private api: BioApiService) {
  }

  retrieveAll(): Observable<Theme[]> {
    return this.api
      .get('/themes')
      .execute()
      .map(res => res.json().map(data => new Theme(data)));
  }

}
