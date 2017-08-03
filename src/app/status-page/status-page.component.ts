import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { BioApiService } from '../api';
import { ApiInfo } from '../models';

@Component({
  selector: 'bio-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: ['./status-page.component.styl']
})
export class StatusPageComponent implements OnInit {
  apiInfo: ApiInfo;
  version: string;

  constructor(private apiService: BioApiService) {
    this.version = environment.version;
  }

  ngOnInit() {
    this.initApiMetadata().subscribe();
  }

  private initApiMetadata(): Observable<ApiInfo> {
    return this.apiService.get('/').execute().map(res => new ApiInfo(res.json())).do(apiInfo => this.apiInfo = apiInfo);
  }

}