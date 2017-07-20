import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';

import { ChangeUserPasswordDialogComponent } from './change-user-password-dialog.component';
import { BioFormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { ShowUserPageComponent } from './show-user-page.component';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    BioFormsModule,
    CommonModule,
    ModalModule,
    MomentModule,
    NotificationsModule,
    ReactiveFormsModule,
    RouterModule,
    TooltipModule,
    UsersModule
  ],
  declarations: [
    ChangeUserPasswordDialogComponent,
    ShowUserPageComponent
  ]
})
export class ShowUserPageModule { }
