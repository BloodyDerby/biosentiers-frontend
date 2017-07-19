import { Injectable } from '@angular/core';
import { RequestOptions, Response } from '@angular/http';
import { ObservableInterceptor, RequestBuilder, RequestBuilderService } from 'ng-request-builder';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/Rx';

import { BioAuthService } from '../auth/auth.service';

@Injectable()
export class BioApiService implements ObservableInterceptor {

  constructor(private auth: BioAuthService, private loadingBarService: SlimLoadingBarService, private requestBuilderService: RequestBuilderService) {
  }

  post(url: string, body?: any): RequestBuilder {
    return this.configure(this.requestBuilderService.post(this.apiUrl(url), body));
  }

  get(url: string): RequestBuilder {
    this.loadingBarService.start();
    return this.configure(this.requestBuilderService.get(this.apiUrl(url)));
  }

  patch(url: string, body?: any): RequestBuilder {
    return this.configure(this.requestBuilderService.patch(this.apiUrl(url), body));
  }

  delete(url: string): RequestBuilder {
    return this.configure(this.requestBuilderService.delete(this.apiUrl(url)));
  }

  onRequest(observable: Observable<Response>): Observable<Response> {
    this.loadingBarService.start();
    return observable.do(undefined, undefined, () => {
      this.loadingBarService.complete();
    });
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
    return builder.interceptor(this);
  }

  private apiUrl(url: string) {
    return url.match(/^(https?:\/\/|\/\/)/) ? url : '/api' + url;
  }

}
