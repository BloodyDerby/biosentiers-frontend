import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import extend from 'lodash/extend';
import { Subscription } from 'rxjs/Rx';

import { BioParticipantsService } from '../participants/participants.service';
import { Excursion } from '../models/excursion';
import { Participant } from '../models/participant';

@Component({
  selector: 'bio-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.styl']
})
export class ParticipantFormComponent implements OnDestroy, OnInit {

  private syncing: boolean;
  private participant: Participant;
  private subscriptions: Subscription[];

  @Input() id: string;
  @Input() form: FormGroup;
  @Input() excursion: Excursion;
  @Output() onRemoved = new EventEmitter<FormGroup>();

  constructor(private participantsService: BioParticipantsService) {
    this.syncing = false;
    this.subscriptions = [];
    this.participant = new Participant();
  }

  ngOnInit() {
    extend(this.participant, this.form.value);

    const sub = this.form.valueChanges
      .do(value => this.unsync())
      .filter(value => this.form.valid)
      .distinctUntilChanged()
      .debounceTime(1000)
      .subscribe(this.save.bind(this));

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  save(values) {
    extend(this.participant, values);

    if (!this.participant.id) {
      this.participantsService.create(this.excursion, this.participant).subscribe(participant => {
        this.syncing = false;
        this.participant = participant;
      });
    } else {
      this.participantsService.update(this.excursion, this.participant).subscribe(participant => {
        this.syncing = false;
        this.participant = participant;
      });
    }
  }

  remove() {
    if (this.participant.id) {
      this.unsync();
      this.participantsService.delete(this.excursion, this.participant).subscribe(participant => {
        this.onRemoved.emit(this.form);
      });
    } else {
      this.onRemoved.emit(this.form);
    }
  }

  unsync() {
    this.syncing = true;
  }

  getNameFormControl(): FormControl {
    return <FormControl>this.form.controls['name'];
  }

}
