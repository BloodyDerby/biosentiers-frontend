import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';

import { BioExcursionsService } from '../excursions/excursions.service';
import { Participant } from '../models/participant';

@Component({
  selector: 'bio-new-participant',
  templateUrl: './new-participant.component.html',
  styleUrls: []
})
export class NewParticipantComponent implements OnInit {

  @Input() participant: Participant;
  @Output() onRemoved = new EventEmitter<Participant>();

  constructor(private excursionsService: BioExcursionsService) {
  }

  ngOnInit() {
  }

  remove() {
    this.onRemoved.emit(this.participant);
  }

}
