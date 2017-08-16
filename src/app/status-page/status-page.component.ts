import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { ApiService } from '../api';
import { ApiInfo } from '../models';
import { TitleService } from '../title';

@Component({
  selector: 'bio-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: ['./status-page.component.styl']
})
export class StatusPageComponent implements OnInit {
  apiInfo: ApiInfo;
  version: string;

  constructor(private apiService: ApiService, private titleService: TitleService) {
    this.version = environment.version;
  }

  ngOnInit() {
    this.titleService.setTitle([ 'Status' ]);
    this.initApiMetadata().subscribe();
  }

  private initApiMetadata(): Observable<ApiInfo> {
    return this.apiService.get('/').execute().map(res => new ApiInfo(res.json())).do(apiInfo => this.apiInfo = apiInfo);
  }

}
