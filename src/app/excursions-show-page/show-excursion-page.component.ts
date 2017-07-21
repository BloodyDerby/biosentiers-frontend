import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions';
import { Excursion, Theme, Zone } from '../models';
import { BioThemesService } from '../themes';
import { BioZonesService } from '../zones';

@Component({
  selector: 'bio-show-excursion-page',
  templateUrl: './show-excursion-page.component.html',
  styleUrls: ['./show-excursion-page.component.styl']
})
export class ShowExcursionPageComponent implements OnInit {
  excursion: Excursion;
  themes: Theme[];
  zones: Zone[];
  initError: Error;

  constructor(private excursionsService: BioExcursionsService, private route: ActivatedRoute, private themesService: BioThemesService, private zonesService: BioZonesService) {
  }

  ngOnInit() {
    this.initExcursion()
      .switchMap(excursion => Observable.forkJoin(
        this.initThemes(excursion),
        this.initZones(excursion)
      ))
      .subscribe(undefined, err => this.initError = err);
  }

  private initExcursion(): Observable<Excursion> {
    const id = this.route.snapshot.params.id;
    return this.excursionsService.retrieve(id, retrieveExcursionParams).do(excursion => this.excursion = excursion);
  }

  private initThemes(excursion: Excursion): Observable<Theme[]> {
    return this.themesService.retrieveAll({
      names: excursion.themes
    }).do(themes => this.themes = themes);
  }

  private initZones(excursion: Excursion): Observable<Zone[]> {
    return this.zonesService.retrieveAll(excursion.trail, {
      hrefs: excursion.zoneHrefs
    }).do(zones => this.zones = zones);
  }
}

const retrieveExcursionParams: RetrieveExcursionParams = {
  includeCreator: true,
  includeTrail: true
};
