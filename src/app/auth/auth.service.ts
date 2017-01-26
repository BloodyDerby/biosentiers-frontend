import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BioAuthService {

  constructor(private http: Http) { }

  authenticate(credentials) {

    const url = '/api/auth';

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return this.http.post(url, credentials, headers);
  }

}
