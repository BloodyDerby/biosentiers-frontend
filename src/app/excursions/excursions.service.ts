import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api/api.service';
import { Excursion } from '../models/excursion';

@Injectable()
export class BioExcursionsService {

  constructor(private api: BioApiService) {
  }

  retrieveAll(): Observable<any> {
    return this.api
      .get('/excursions')
      .execute()
      .map(res => res.json());
  }

  retrieve(id): Observable<Excursion> {
    return this.api
      .get(`/excursions/${id}`)
      .execute()
      .map(res => new Excursion(res.json()));
  }

}
