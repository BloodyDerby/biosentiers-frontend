import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import times from 'lodash/times';

import { EditExcursionService } from './edit-excursion.service';
import { Participant } from '../models/participant';
import { BioParticipantsService } from '../participants/participants.service';
import { Excursion } from '../models/excursion';

@Component({
  selector: 'bio-edit-excursion-participants-step',
  templateUrl: './edit-excursion-participants-step.component.html',
  styleUrls: ['./edit-excursion-participants-step.component.styl']
})
export class EditExcursionParticipantsStepComponent implements OnInit {

  private excursion: Excursion;
  private excursionParticipantsForm: FormGroup;
  private participants: Participant[];

  constructor(private formBuilder: FormBuilder, private editExcursionService: EditExcursionService, private participantsService: BioParticipantsService) {
    this.participants = [];
  }

  ngOnInit() {
    this.excursionParticipantsForm = this.formBuilder.group({
      participantsIncrement: [ '1' ]
    });

    this.editExcursionService.excursionObs.subscribe((excursion) => {
      if (excursion) {
        this.excursion = excursion;
        this.loadParticipants(excursion);
      }
    });
  }

  loadParticipants(excursion) {
    this.participantsService.retrieveAll(this.excursion).subscribe(participants => {
      if (participants.length) {
        participants.forEach(participant => this.addParticipant(participant));
      } else {
        this.addParticipant();
      }
    });
  }

  addParticipantBatch() {
    times(this.excursionParticipantsForm.value.participantsIncrement, () => this.addParticipant());
  }

  addParticipant(participant?: Participant) {
    this.participants.push(participant || new Participant());
  }

  onParticipantRemoved(participant: Participant) {
    this.participants.splice(this.participants.indexOf(participant), 1);
  }

}
