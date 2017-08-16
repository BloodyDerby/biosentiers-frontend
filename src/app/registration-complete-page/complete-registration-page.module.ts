import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthModule } from '../auth';
import { AuthApiModule } from '../auth-api';
import { CompleteRegistrationPageComponent } from './complete-registration-page.component';
import { FormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { TitleModule } from '../title';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    AuthApiModule,
    AuthModule,
    CommonModule,
    FormsModule,
    NotificationsModule,
    ReactiveFormsModule,
    TitleModule,
    UsersModule
  ],
  declarations: [
    CompleteRegistrationPageComponent
  ]
})
export class CompleteRegistrationPageModule { }
