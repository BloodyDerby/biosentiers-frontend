import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import times from 'lodash/times';

import { BioExcursionsService } from '../excursions/excursions.service';
import { Participant } from '../models/participant';

@Component({
  selector: 'bio-excursions-new-page',
  templateUrl: './excursions-new-page.component.html',
  styleUrls: ['./excursions-new-page.component.styl']
})
export class NewExcursionPageComponent implements OnInit {

  private excursionForm: FormGroup;

  constructor(private excursionsService: BioExcursionsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.excursionForm = this.formBuilder.group({
      participants: this.formBuilder.array([]),
      participantsIncrement: [ '1' ]
    });

    this.addParticipant();
  }

  addParticipant() {
    times(this.excursionForm.value.participantsIncrement, () => {
      this.getParticipantsFormArray().push(this.formBuilder.group({
        name: [ '' ]
      }));
    });
  }

  onParticipantRemoved(participantForm: FormGroup) {
    const participantsFormArray: FormArray = this.getParticipantsFormArray();
    participantsFormArray.removeAt(participantsFormArray.controls.indexOf(participantForm));
  }

  getParticipantsFormArray(): FormArray {
    return <FormArray>this.excursionForm.controls['participants'];
  }

}
