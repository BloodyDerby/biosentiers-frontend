import { Component, OnInit, ViewChild } from '@angular/core';

import { InvitationDialogComponent } from '../invitation-dialog/invitation-dialog.component';

@Component({
  selector: 'bio-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.styl']
})
export class UsersPageComponent implements OnInit {

  @ViewChild(InvitationDialogComponent) invitationDialog: InvitationDialogComponent;

  constructor() { }

  ngOnInit() {
  }

  openInvitationDialog() {
    this.invitationDialog.open();
  }

}
