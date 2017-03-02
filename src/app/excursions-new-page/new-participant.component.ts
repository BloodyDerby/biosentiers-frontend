import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { BioExcursionsService } from '../excursions/excursions.service';
import { Participant } from '../models/participant';

@Component({
  selector: 'bio-new-participant',
  templateUrl: './new-participant.component.html',
  styleUrls: ['./new-participant.component.styl']
})
export class NewParticipantComponent implements OnDestroy, OnInit {

  private synced: boolean;
  private subscriptions: Subscription[];
  @Input() id: string;
  @Input() form: FormGroup;
  @Output() onRemoved = new EventEmitter<FormGroup>();

  constructor(private excursionsService: BioExcursionsService) {
    this.synced = false;
    this.subscriptions = [];
  }

  ngOnInit() {
    const sub = this.form.valueChanges.do(value => this.unsync()).debounceTime(1000).subscribe(value => {
      console.log('@@@@ save ' + JSON.stringify(value));
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  remove() {
    this.onRemoved.emit(this.form);
  }

  isSynced(): boolean {
    return !this.getNameFormControl().dirty || this.synced;
  }

  unsync() {
    this.synced = false;
  }

  getNameFormControl(): FormControl {
    return <FormControl>this.form.controls['name'];
  }

}
