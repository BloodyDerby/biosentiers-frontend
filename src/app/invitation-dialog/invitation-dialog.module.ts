import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SelectModule } from 'ng-select';

import { BioAuthModule } from '../auth';
import { InvitationDialogComponent } from './invitation-dialog.component';
import { NotificationsModule } from '../notifications';

@NgModule({
  declarations: [
    InvitationDialogComponent
  ],
  exports: [
    InvitationDialogComponent
  ],
  imports: [
    BioAuthModule,
    CommonModule,
    FormsModule,
    ModalModule,
    NotificationsModule,
    ReactiveFormsModule,
    SelectModule
  ]
})
export class InvitationDialogModule { }
