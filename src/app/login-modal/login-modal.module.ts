import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/modal';

import { BioAuthModule } from '../auth/auth.module';
import { LoginModalComponent } from './login-modal.component';

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
    ReactiveFormsModule
  ]
})
export class LoginModalModule { }
