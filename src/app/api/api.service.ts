import { Injectable } from '@angular/core';
import { RequestBuilder, RequestBuilderService } from 'ng-request-builder';

import { BioAuthService } from '../auth/auth.service';

@Injectable()
export class BioApiService {

  constructor(private auth: BioAuthService, private requestBuilderService: RequestBuilderService) {
  }

  public delete(url: string): RequestBuilder {
    return this.configure(this.requestBuilderService.delete(this.apiUrl(url)));
  }

  public get(url: string): RequestBuilder {
    return this.configure(this.requestBuilderService.get(this.apiUrl(url)));
  }

  public patch(url: string, body?: any) {
    return this.configure(this.requestBuilderService.patch(this.apiUrl(url), body));
  }

  public post(url: string, body?: any) {
    return this.configure(this.requestBuilderService.post(this.apiUrl(url), body));
  }

  private configure(builder: RequestBuilder): RequestBuilder {
    this.auth.addAuthorization(builder);
    return builder;
  }

  private apiUrl(url: string) {
    return url.match(/^(https?:\/\/|\/\/)/) ? url : '/api' + url;
  }

}
