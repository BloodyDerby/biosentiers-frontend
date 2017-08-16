import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClipboardModule } from 'ngx-clipboard';
import { SelectModule } from 'ng-select';
import { TooltipModule } from 'ngx-bootstrap';

import { AuthApiModule } from '../auth-api';
import { FormsModule as BioFormsModule } from '../forms';
import { InvitationDialogComponent } from './invitation-dialog.component';
import { NotificationsModule } from '../notifications';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    AuthApiModule,
    BioFormsModule,
    ClipboardModule,
    CommonModule,
    FormsModule,
    ModalModule,
    MomentModule,
    NotificationsModule,
    ReactiveFormsModule,
    SelectModule,
    TooltipModule,
    UsersModule
  ],
  declarations: [
    InvitationDialogComponent
  ],
  exports: [
    InvitationDialogComponent
  ]
})
export class InvitationDialogModule { }
