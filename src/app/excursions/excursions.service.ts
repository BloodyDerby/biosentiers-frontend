import { Injectable } from '@angular/core';

import { BioApiService } from '../api/api.service';

@Injectable()
export class BioExcursionsService {

  constructor(private api: BioApiService) {
  }

  retrieveAll() {
    return this.api
      .get('/excursions')
      .execute()
      .map(res => res.json());
  }

}
