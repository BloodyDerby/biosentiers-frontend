import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import isArray from 'lodash/isArray';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { toObservable } from '../utils/async';

type TitleData = string | string[];

@Injectable()
export class TitleService {
  private currentTitle: string;

  constructor(private titleService: Title) {
  }

  setTitle(titleData: TitleData | Observable<TitleData>): Observable<string> {

    const obs = toObservable<TitleData>(titleData).first().map(titleData => {

      const title = isArray(titleData) ? [ 'BioSentiers', ...titleData ].join(' > ') : titleData;

      this.currentTitle = title;
      this.titleService.setTitle(title);

      return title;
    }).share();

    obs.subscribe();

    return obs;
  }

  changeTitle(titleData: TitleData | Observable<TitleData>): Observable<TitleChange> {
    const previousTitle = this.currentTitle;
    return this.setTitle(titleData).map(title => new TitleChange(this, previousTitle, title));
  }

}

export class TitleChange {
  previousTitle: string;
  title: string;

  constructor(private titleService: TitleService, previousTitle: string, title: string) {
    this.previousTitle = previousTitle;
    this.title = title;
  }

  changeBack(): Observable<string> {
    return this.titleService.setTitle(this.previousTitle);
  }
}
