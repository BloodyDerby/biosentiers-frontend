import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { InstallationEvent } from '../models';

@Component({
  selector: 'bio-show-installation-event-dialog',
  templateUrl: './show-installation-event-dialog.component.html',
  styleUrls: ['./show-installation-event-dialog.component.styl']
})
export class ShowInstallationEventDialogComponent implements OnInit {
  installationEvent: InstallationEvent;

  @Output('close')
  onClose: EventEmitter<InstallationEvent>;

  @Output('closed')
  onClosed: EventEmitter<InstallationEvent>;

  @ViewChild('modal')
  private modal: ModalDirective;

  constructor() {
    this.onClose = new EventEmitter<InstallationEvent>();
    this.onClosed = new EventEmitter<InstallationEvent>();
  }

  ngOnInit() {
  }

  onModalHide() {
    this.onClose.emit(this.installationEvent);
  }

  onModalHidden() {
    this.onClosed.emit(this.installationEvent);
    delete this.installationEvent;
  }

  open(installationEvent: InstallationEvent) {
    this.installationEvent = installationEvent;
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

}
