import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { RequestBuilder, RequestBuilderService } from 'ng-request-builder';

import { BioAuthService } from '../auth/auth.service';

@Injectable()
export class BioApiService {

  constructor(private auth: BioAuthService, private requestBuilderService: RequestBuilderService) {
  }

  delete(url: string): RequestBuilder {
    return this.configure(this.requestBuilderService.delete(this.apiUrl(url)));
  }

  get(url: string): RequestBuilder {
    return this.configure(this.requestBuilderService.get(this.apiUrl(url)));
  }

  patch(url: string, body?: any) {
    return this.configure(this.requestBuilderService.patch(this.apiUrl(url), body));
  }

  post(url: string, body?: any) {
    return this.configure(this.requestBuilderService.post(this.apiUrl(url), body));
  }

  paramsModifier<T>(func: (params: T, options: RequestOptions) => any, params?: T) {
    return function(options: RequestOptions) {
      if (params) {
        func(params, options);
      }
    };
  }

  private configure(builder: RequestBuilder): RequestBuilder {
    this.auth.addAuthorization(builder);
    return builder;
  }

  private apiUrl(url: string) {
    return url.match(/^(https?:\/\/|\/\/)/) ? url : '/api' + url;
  }

}
