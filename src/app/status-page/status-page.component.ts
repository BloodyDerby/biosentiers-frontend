import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { ApiService } from '../api';
import { ApiInfo, Stats } from '../models';
import { StatusService } from '../status';
import { TitleService } from '../title';

@Component({
  selector: 'bio-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: ['./status-page.component.styl']
})
export class StatusPageComponent implements OnInit {
  apiInfo: ApiInfo;
  stats: Stats;
  version: string;
  initError: Error;

  constructor(private apiService: ApiService, private statusService: StatusService, private titleService: TitleService) {
    this.version = environment.version;
  }

  ngOnInit() {
    this.titleService.setTitle([ 'Status' ]);

    Observable.forkJoin(
      this.initApiMetadata(),
      this.initStats()
    ).subscribe(undefined, err => this.initError = err);
  }

  private initApiMetadata(): Observable<ApiInfo> {
    return this.apiService.get('/').execute().map(res => new ApiInfo(res.json())).do(apiInfo => this.apiInfo = apiInfo);
  }

  private initStats(): Observable<Stats> {
    return this.statusService.retrieveStats().do(stats => this.stats = stats);
  }

}
