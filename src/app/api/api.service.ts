import { Injectable } from '@angular/core';
import { RequestBuilder, RequestBuilderService } from 'ng-request-builder';

import { BioAuthService } from '../auth/auth.service';

@Injectable()
export class BioApiService {

  constructor(private auth: BioAuthService, private requestBuilderService: RequestBuilderService) {
  }

  request(url: string): RequestBuilder {
    const builder = this.requestBuilderService.request(url);
    this.auth.addRequestHeaders(builder.options);
    return builder;
  }

}
