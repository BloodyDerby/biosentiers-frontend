import { Component, OnInit, ViewChild } from '@angular/core';
import times from 'lodash/times';

import { BioExcursionsService } from '../excursions/excursions.service';
import { Participant } from '../models/participant';

@Component({
  selector: 'bio-excursions-new-page',
  templateUrl: './excursions-new-page.component.html',
  styleUrls: ['./excursions-new-page.component.styl']
})
export class NewExcursionPageComponent implements OnInit {

  private participants: Participant[];
  private participantsIncrement: number;

  constructor(private excursionsService: BioExcursionsService) {
    this.participants = [];
    this.participantsIncrement = 1;
  }

  ngOnInit() {
    this.addParticipant();
  }

  addParticipant() {
    times(this.participantsIncrement, () => {
      this.participants.push(new Participant());
    });
  }

  onParticipantRemoved(participant: Participant) {
    this.participants.splice(this.participants.indexOf(participant), 1);
  }

}
