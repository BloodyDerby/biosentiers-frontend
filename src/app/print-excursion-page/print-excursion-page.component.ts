import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { RetrieveExcursionParams, BioExcursionsService } from '../excursions/excursions.service';
import { Excursion, Participant, Zone } from '../models';
import { BioParticipantsService } from '../participants/participants.service';
import { BioZonesService, RetrieveZonesParams } from '../zones/zones.service';

@Component({
  selector: 'bio-print-excursion-page',
  templateUrl: './print-excursion-page.component.html',
  styleUrls: ['./print-excursion-page.component.styl']
})
export class PrintExcursionPageComponent implements OnInit {

  excursion: Excursion;
  participants: Participant[];
  zones: Zone[];

  constructor(private excursionsService: BioExcursionsService, private participantsService: BioParticipantsService, private route: ActivatedRoute, private zonesService: BioZonesService) {
  }

  ngOnInit() {

    const excursionObs = this.retrieveExcursion()
      .do(excursion => this.excursion = excursion);

    excursionObs
      .switchMap((excursion: Excursion) => {
        return Observable.forkJoin(
          this.retrieveParticipants(excursion),
          this.retrieveZones(excursion)
        );
      }).subscribe(results => {
        this.participants = results[0];
        this.zones = results[1];
      });
  }

  retrieveExcursion(): Observable<Excursion> {
    const params: RetrieveExcursionParams = {
      includeCreator: true,
      includeTrail: true
    };

    return this.excursionsService.retrieve(this.route.snapshot.params['id'], params);
  }

  retrieveParticipants(excursion: Excursion): Observable<Participant[]> {
    return this.participantsService.retrieveAll(excursion);
  }

  retrieveZones(excursion: Excursion): Observable<Zone[]> {
    const params: RetrieveZonesParams = {
      hrefs: excursion.zoneHrefs
    };

    return this.zonesService.retrieveAll(excursion.trail, params);
  }

}
