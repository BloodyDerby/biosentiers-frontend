import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthApiModule } from '../auth-api';
import { FormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { ResetPasswordPageComponent } from './reset-password-page.component';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    AuthApiModule,
    CommonModule,
    FormsModule,
    NotificationsModule,
    ReactiveFormsModule,
    RouterModule,
    UsersModule
  ],
  declarations: [
    ResetPasswordPageComponent
  ]
})
export class ResetPasswordPageModule { }
