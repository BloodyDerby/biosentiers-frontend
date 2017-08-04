import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthModule } from '../auth';
import { AuthApiModule } from '../auth-api';
import { FormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { CompleteRegistrationPageComponent } from './complete-registration-page.component';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    AuthApiModule,
    AuthModule,
    CommonModule,
    FormsModule,
    NotificationsModule,
    ReactiveFormsModule,
    UsersModule
  ],
  declarations: [
    CompleteRegistrationPageComponent
  ]
})
export class CompleteRegistrationPageModule { }
