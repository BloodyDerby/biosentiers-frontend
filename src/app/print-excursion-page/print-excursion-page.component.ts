import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Excursion } from '../models/excursion';
import { RetrieveExcursionParams, BioExcursionsService } from '../excursions/excursions.service';
import { BioParticipantsService } from '../participants/participants.service';
import { Participant } from '../models/participant';

@Component({
  selector: 'bio-print-excursion-page',
  templateUrl: './print-excursion-page.component.html',
  styleUrls: ['./print-excursion-page.component.styl']
})
export class PrintExcursionPageComponent implements OnInit {

  private excursion: Excursion;
  private participants: Participant[];

  constructor(private excursionsService: BioExcursionsService, private participantsService: BioParticipantsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const params: RetrieveExcursionParams = {
      includeCreator: true,
      includeTrail: true
    };

    this.excursionsService.retrieve(this.route.snapshot.params['id'], params).subscribe(excursion => {
      this.excursion = excursion;
      this.participantsService.retrieveAll(excursion).subscribe(participants => {
        this.participants = participants;
      });
    });
  }

}
