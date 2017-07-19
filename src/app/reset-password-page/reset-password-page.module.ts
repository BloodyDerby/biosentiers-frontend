import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BioApiModule } from '../api';
import { BioFormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { ResetPasswordPageComponent } from './reset-password-page.component';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    BioApiModule,
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
