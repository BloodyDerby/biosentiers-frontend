import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';
import { ApiService } from '../api';
import { Activity, ApiInfo, Stats } from '../models';
import { StatusService } from '../status';
import { TitleService } from '../title';

export interface ActivityChartOptions {
  type: string;
  datasets: any[];
  labels: string[];
  options: any;
}

@Component({
  selector: 'bio-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: ['./status-page.component.styl']
})
export class StatusPageComponent implements OnInit, OnDestroy {

  activityChart: ActivityChartOptions;
  activityForm: FormGroup;
  activityIntervalChoices: { [key: string]: string }[];
  activitySubjectChoices: { [key: string]: string }[];

  apiInfo: ApiInfo;
  production: boolean;
  stats: Stats;
  time: Date;
  timeInterval: number;
  version: string;
  initError: Error;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private statusService: StatusService, private titleService: TitleService) {

    this.version = environment.version;
    this.production = environment.production;

    this.activityIntervalChoices = [
      { value: 'hour', label: 'Dernières 24 heures' },
      { value: 'day', label: 'Derniers 30 jours' },
      { value: 'week', label: 'Dernières 26 semaines' },
      { value: 'month', label: 'Derniers 24 mois' }
    ];

    this.activitySubjectChoices = [
      { value: 'excursions', label: 'Sorties' },
      { value: 'installations', label: 'Applications installées' },
      { value: 'installationEvents', label: 'Actions utilisateur' },
      { value: 'users', label: 'Comptes utilisateurs' }
    ];

    this.time = new Date();
  }

  ngOnInit() {
    this.titleService.setTitle([ 'Status' ]);

    this.initActivityForm();

    Observable.forkJoin(
      this.initApiMetadata(),
      this.initStats()
    ).subscribe(undefined, err => this.initError = err);

    this.activityChart = {
      type: 'bar',
      datasets: [
        {
          yAxisID: 'y',
          data: []
        }
      ],
      labels: [],
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: 'y',
              position: 'left',
              ticks: {
                beginAtZero: 0,
                min: 0
              }
            }
          ]
        }
      }
    };

    this.timeInterval = window.setInterval(() => this.time = new Date(), 1000);
  }

  ngOnDestroy() {
    window.clearInterval(this.timeInterval);
  }

  chartIsLoading(): boolean {
    return !this.activityChart.datasets[0].data.length;
  }

  chartIsBlank(): boolean {
    const data = this.activityChart.datasets[0].data;
    return data.length && !data.find(value => value > 0);
  }

  private initActivityForm() {

    this.activityForm = this.formBuilder.group({
      interval: [ 'day', Validators.required ],
      subject: [ 'installationEvents', Validators.required ]
    });

    this.loadActivity(this.activityForm.value);

    this.activityForm.valueChanges.subscribe(value => this.loadActivity(value));
  }

  private initApiMetadata(): Observable<ApiInfo> {
    return this.apiService.get('/').execute().map(res => new ApiInfo(res.json())).do(apiInfo => this.apiInfo = apiInfo);
  }

  private initStats(): Observable<Stats> {
    return this.statusService.retrieveStats().do(stats => this.stats = stats);
  }

  private loadActivity(value) {
    this.statusService
      .retrieveActivity(value)
      .subscribe(activity => this.updateActivityChart(activity));
  }

  private updateActivityChart(activity: Activity) {

    const values = activity.values.reverse();
    this.activityChart.datasets[0].data = values.map(value => value.count);

    let format;
    if (activity.interval == 'hour') {
      format = 'HH:mm';
    } else if (activity.interval == 'month') {
      format = 'YYYY-MM';
    } else {
      format = 'YYYY-MM-DD';
    }

    this.activityChart.labels = values.map(value => moment.utc(value.countedAt).format(format));

    /*
     * The following block improves chart rendering when all values are under 10:
     *
     * * If all values are small, Chart.js will display floating point numbers in the Y axis (e.g. 2.5).
     * * If all values are zero, Chart.js will also display negative numbers (despite the `min: 0`
     *   configuration for the Y axis: https://github.com/chartjs/Chart.js/issues/2438).
     *
     * The problem is solved by setting the min & max values of the Y axis and a step size of 1:
     *
     * If there are no values greater than or equal to 10, the maximum value of the Y axis is
     * set to the highest value plus one, or three at the minimum (the chart doesn't look very
     * good with only 1 or 2 ticks on the Y axis).
     */
    const maxValue = values.reduce((memo, value) => value.count > memo ? value.count : memo, 0);
    if (maxValue < 10) {
      this.activityChart.options.scales.yAxes[0].ticks.max = Math.max(maxValue + 1, 3);
      this.activityChart.options.scales.yAxes[0].ticks.stepSize = 1;
    } else {
      delete this.activityChart.options.scales.yAxes[0].ticks.max;
      delete this.activityChart.options.scales.yAxes[0].ticks.stepSize;
    }
  }
}
