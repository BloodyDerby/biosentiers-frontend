import { RequestOptions, Headers, URLSearchParams, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class ApiRequest {

  private http: Http;
  private requestUrl: string;
  private requestOptions: RequestOptions;

  constructor(http: Http) {
    this.http = http;
    this.requestOptions = new RequestOptions({
      headers: new Headers(),
      search: new URLSearchParams()
    });
  }

  get options(): RequestOptions {
    return this.requestOptions;
  }

  method(method: string): ApiRequest {
    this.requestOptions.method = method;
    return this;
  }

  url(url: string): ApiRequest {
    this.requestUrl = url.match(/^(https?\:\/\/|\/\/)/) ? url : '/api' + url;
    return this;
  }

  json(object: any): ApiRequest {
    this.requestOptions.body = JSON.stringify(object);
    this.requestOptions.headers.set('Content-Type', 'application/json');
    return this;
  }

  header(key: string, value: string): ApiRequest {
    this.requestOptions.headers.set(key, value);
    return this;
  }

  execute(): Observable<Response> {
    if (!this.requestUrl) {
      throw new Error('Request URL must be set');
    }

    return this.http.request(this.requestUrl, this.requestOptions);
  }
}
