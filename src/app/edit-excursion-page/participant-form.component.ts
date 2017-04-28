import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
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

  private form: FormGroup;
  private syncing: boolean;
  private subscriptions: Subscription[];

  @Input() id: string;
  @Input() participant: Participant;
  @Input() excursion: Excursion;
  @Output() onRemoved = new EventEmitter<Participant>();

  constructor(private formBuilder: FormBuilder, private participantsService: BioParticipantsService) {
    this.syncing = false;
    this.subscriptions = [];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [ this.participant.id ],
      name: [ this.participant.name ]
    });

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
    extend(this.participant, pick(values, 'name'));

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
        this.onRemoved.emit(this.participant);
      });
    } else {
      this.onRemoved.emit(this.participant);
    }
  }

  unsync() {
    this.syncing = true;
  }

}
