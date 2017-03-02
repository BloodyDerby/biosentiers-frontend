import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import times from 'lodash/times';

import { BioExcursionsService } from '../excursions/excursions.service';
import { BioParticipantsService } from '../participants/participants.service';
import { Excursion } from '../models/excursion';
import { Participant } from '../models/participant';

@Component({
  selector: 'bio-edit-excursion-page',
  templateUrl: './edit-excursion-page.component.html',
  styleUrls: ['./edit-excursion-page.component.styl']
})
export class EditExcursionPageComponent implements OnInit {

  private excursion: Excursion;
  private excursionForm: FormGroup;

  constructor(private route: ActivatedRoute, private excursionsService: BioExcursionsService, private formBuilder: FormBuilder, private participantsService: BioParticipantsService) {
  }

  ngOnInit() {
    this.excursionsService.retrieve(this.route.snapshot.params['id']).subscribe(excursion => {
      this.excursion = excursion;
      this.participantsService.retrieveAll(this.excursion).subscribe(participants => {
        if (participants.length) {
          participants.forEach(participant => this.addParticipant(participant));
        } else {
          this.addParticipant();
        }
      });
    });

    this.excursionForm = this.formBuilder.group({
      participants: this.formBuilder.array([]),
      participantsIncrement: [ '1' ]
    });
  }

  addParticipantBatch() {
    times(this.excursionForm.value.participantsIncrement, () => this.addParticipant());
  }

  addParticipant(participant?: Participant) {
    this.getParticipantsFormArray().push(this.formBuilder.group({
      id: [ participant ? participant.id : null ],
      name: [ participant ? participant.name : '' ]
    }));
  }

  onParticipantRemoved(participantForm: FormGroup) {
    const participantsFormArray: FormArray = this.getParticipantsFormArray();
    participantsFormArray.removeAt(participantsFormArray.controls.indexOf(participantForm));
  }

  getParticipantsFormArray(): FormArray {
    return <FormArray>this.excursionForm.controls['participants'];
  }

}
