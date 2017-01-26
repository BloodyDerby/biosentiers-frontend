import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { ApiRequest } from './api.request';
import { BioAuthService } from '../auth/auth.service';

@Injectable()
export class BioApiService {

  constructor(private auth: BioAuthService, private http: Http) {
  }

  request(method: string, url: string) {

    const request = new ApiRequest(this.http)
      .method(method)
      .url(url);

    this.auth.addRequestHeaders(request.options);

    return request;
  }

}

'head delete get options patch post put'.split(/\s+/).forEach((method) => {
  BioApiService.prototype[method] = function(url: string): ApiRequest {
    return this.request(method, url);
  };
});
