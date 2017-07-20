import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BioAuthModule } from '../auth';
import { BioFormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { ResetPasswordPageComponent } from './reset-password-page.component';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    BioAuthModule,
    BioFormsModule,
    CommonModule,
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
