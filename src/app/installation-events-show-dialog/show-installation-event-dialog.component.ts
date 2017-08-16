import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { Installation, InstallationEvent } from '../models';
import { TitleChange, TitleService } from '../title';

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

  private titleChange: TitleChange;

  constructor(private titleService: TitleService) {
    this.onClose = new EventEmitter<InstallationEvent>();
    this.onClosed = new EventEmitter<InstallationEvent>();
  }

  ngOnInit() {
  }

  onModalHide() {
    if (this.titleChange) {
      this.titleChange.changeBack();
      this.titleChange = undefined;
    }

    this.onClose.emit(this.installationEvent);
  }

  onModalHidden() {
    this.onClosed.emit(this.installationEvent);
    delete this.installationEvent;
  }

  open(installation: Installation, installationEvent: InstallationEvent) {
    this.installationEvent = installationEvent;
    this.modal.show();

    this.titleService
      .changeTitle([ 'Installations', installation.id, 'Événement', this.installationEvent.id ])
      .first()
      .subscribe(titleChange => this.titleChange = titleChange);
  }

  close() {
    this.modal.hide();
  }

}
