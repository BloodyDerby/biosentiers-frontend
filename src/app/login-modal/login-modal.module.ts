import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BioAuthModule } from '../auth/auth.module';
import { LoginModalComponent } from './login-modal.component';
import { NotificationsModule } from '../notifications';

@NgModule({
  declarations: [
    LoginModalComponent
  ],
  exports: [
    LoginModalComponent
  ],
  imports: [
    BioAuthModule,
    CommonModule,
    FormsModule,
    ModalModule,
    NotificationsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginModalModule { }
