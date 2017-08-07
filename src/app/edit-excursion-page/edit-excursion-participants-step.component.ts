import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import times from 'lodash/times';
import { Observable } from 'rxjs/Rx';

import { EditExcursionService } from './edit-excursion.service';
import { Excursion, Participant } from '../models';
import { ParticipantsService } from '../participants';

@Component({
  selector: 'bio-edit-excursion-participants-step',
  templateUrl: './edit-excursion-participants-step.component.html',
  styleUrls: ['./edit-excursion-participants-step.component.styl']
})
export class EditExcursionParticipantsStepComponent implements OnInit {

  excursion: Excursion;
  excursionParticipantsForm: FormGroup;
  participants: Participant[];

  constructor(private editExcursionService: EditExcursionService, private formBuilder: FormBuilder, private participantsService: ParticipantsService) {
    this.participants = [];
  }

  ngOnInit() {
    this.excursionParticipantsForm = this.formBuilder.group({
      participantsIncrement: [ '1' ]
    });

    this.editExcursionService.excursionObs.first().subscribe((excursion) => {
      this.excursion = excursion;
      this.loadParticipants(excursion);
    });
  }

  loadParticipants(excursion) {
    this.participantsService.retrieveAll(excursion).subscribe(participants => {
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

  onParticipantCreated(participant: Participant) {
    this.incrementParticipantsCount(1);
  }

  onParticipantRemoved(participant: Participant) {
    this.participants.splice(this.participants.indexOf(participant), 1);

    if (participant.id) {
      this.incrementParticipantsCount(-1);
    }
  }

  private incrementParticipantsCount(value: number): Observable<Excursion> {

    const obs = this.editExcursionService.excursionObs.first().switchMap(excursion => {
      return this.editExcursionService.patchExcursion({
        participantsCount: excursion.participantsCount + value
      });
    }).share();

    obs.subscribe();
    return obs;
  }

}
