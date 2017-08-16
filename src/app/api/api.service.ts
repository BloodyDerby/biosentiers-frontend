import { Injectable } from '@angular/core';
import { RequestOptions, Response } from '@angular/http';
import pull from 'lodash/pull';
import { ObservableInterceptor, RequestBuilder, RequestBuilderService } from 'ng-request-builder';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../auth';

@Injectable()
export class ApiService implements ObservableInterceptor {
  private currentRequests: Observable<any>[];
  private completeProgressTimeout;

  constructor(private authService: AuthService, private loadingBarService: SlimLoadingBarService, private requestBuilderService: RequestBuilderService) {
    this.currentRequests = [];
  }

  post(url: string, body?: any): RequestBuilder {
    return this.configure(this.requestBuilderService.post(this.apiUrl(url), body));
  }

  head(url: string): RequestBuilder {
    return this.configure(this.requestBuilderService.head(this.apiUrl(url)));
  }

  get(url: string): RequestBuilder {
    return this.configure(this.requestBuilderService.get(this.apiUrl(url)));
  }

  patch(url: string, body?: any): RequestBuilder {
    return this.configure(this.requestBuilderService.patch(this.apiUrl(url), body));
  }

  delete(url: string): RequestBuilder {
    return this.configure(this.requestBuilderService.delete(this.apiUrl(url)));
  }

  onRequest(observable: Observable<Response>): Observable<Response> {

    this.startProgress(observable);

    const checkAuthentication = this.checkAuthentication.bind(this);
    const completeProgress = this.completeProgress.bind(this, observable);

    return observable
      .do(undefined, checkAuthentication)
      .do(completeProgress, completeProgress, completeProgress);
  }

  private checkAuthentication(res: Response) {
    if (res.status == 401) {
      this.authService.unauthenticate();
    }
  }

  private startProgress(observable: Observable<any>) {
    if (!this.currentRequests.length) {
      this.loadingBarService.start();
    }

    this.currentRequests.push(observable);
  }

  private completeProgress(observable: Observable<any>) {
    pull(this.currentRequests, observable);
    this.completeProgressSoon();
  }

  private completeProgressSoon() {
    if (this.completeProgressTimeout) {
      clearTimeout(this.completeProgressTimeout);
    }

    this.completeProgressTimeout = setTimeout(() => {
      delete this.completeProgressTimeout;
      if (!this.currentRequests.length) {
        this.loadingBarService.complete();
      }
    }, 100);
  }

  private configure(builder: RequestBuilder): RequestBuilder {
    this.authService.addAuthorization(builder);
    return builder.interceptor(this);
  }

  private apiUrl(url: string) {
    return url.match(/^(https?:\/\/|\/\/)/) || url.match(/^\/api.+/) ? url : `/api${url}`;
  }

}
