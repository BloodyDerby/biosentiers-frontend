import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ExcursionsService, RetrieveExcursionParams } from '../excursions';
import { Excursion, Participant, Zone } from '../models';
import { ParticipantsService } from '../participants';
import { TitleService } from '../title';
import { RetrieveZonesParams, ZonesService } from '../zones';

@Component({
  selector: 'bio-print-excursion-page',
  templateUrl: './print-excursion-page.component.html',
  styleUrls: ['./print-excursion-page.component.styl']
})
export class PrintExcursionPageComponent implements OnInit {

  excursion: Excursion;
  participants: Participant[];
  zones: Zone[];

  constructor(private excursionsService: ExcursionsService, private participantsService: ParticipantsService, private route: ActivatedRoute, private titleService: TitleService, private zonesService: ZonesService) {
  }

  ngOnInit() {

    const excursionObs = this.retrieveExcursion()
      .do(excursion => this.excursion = excursion);

    this.titleService.setTitle(excursionObs.map(excursion => {
      return [ ...this.excursionsService.getExcursionPageTitle(excursion), 'Impression' ];
    }));

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
    return this.zonesService.retrieveAll(excursion.trail, {
      href: excursion.zoneHrefs
    });
  }

}
