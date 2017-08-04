import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { AuthApiModule } from '../auth-api';
import { NotificationsModule } from '../notifications';
import { PasswordResetLinkDialogComponent } from './password-reset-link-dialog.component';
import { ShowUserPageComponent } from './show-user-page.component';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    AuthApiModule,
    ClipboardModule,
    CommonModule,
    ModalModule,
    MomentModule,
    NotificationsModule,
    RouterModule,
    TooltipModule,
    UsersModule
  ],
  declarations: [
    PasswordResetLinkDialogComponent,
    ShowUserPageComponent
  ]
})
export class ShowUserPageModule { }
