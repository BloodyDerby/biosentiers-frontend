import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions';
import { Excursion, Participant, Theme, Zone } from '../models';
import { BioParticipantsService } from '../participants';
import { BioThemesService } from '../themes';
import { BioZonesService } from '../zones';

@Component({
  selector: 'bio-show-excursion-page',
  templateUrl: './show-excursion-page.component.html',
  styleUrls: ['./show-excursion-page.component.styl']
})
export class ShowExcursionPageComponent implements OnInit {
  excursion: Excursion;
  participants: Participant[];
  themes: Theme[];
  zones: Zone[];
  initError: Error;

  constructor(private excursionsService: BioExcursionsService, private route: ActivatedRoute, private participantsService: BioParticipantsService, private themesService: BioThemesService, private zonesService: BioZonesService) {
  }

  ngOnInit() {
    this.initExcursion()
      .switchMap(excursion => Observable.forkJoin(
        this.initParticipants(excursion),
        this.initThemes(excursion)
      ))
      .subscribe(undefined, err => this.initError = err);
  }

  onZonesLoaded(zones: Zone[]) {
    this.zones = zones;
  }

  private initExcursion(): Observable<Excursion> {
    const id = this.route.snapshot.params.id;
    return this.excursionsService.retrieve(id, retrieveExcursionParams).do(excursion => this.excursion = excursion);
  }

  private initParticipants(excursion: Excursion): Observable<Participant[]> {
    if (!excursion.participantsCount) {
      return Observable.of([]);
    }

    return this.participantsService.retrieveAll(excursion).do(participants => this.participants = participants);
  }

  private initThemes(excursion: Excursion): Observable<Theme[]> {
    if (!excursion.themes.length) {
      this.themes = [];
      return Observable.of(this.themes);
    }

    return this.themesService.retrieveAll({
      names: excursion.themes
    }).do(themes => this.themes = themes);
  }
}

const retrieveExcursionParams: RetrieveExcursionParams = {
  includeCreator: true,
  includeTrail: true
};
