import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BioAuthModule } from '../auth/auth.module';
import { BioFormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { RegistrationPageComponent } from './registration-page.component';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    BioAuthModule,
    BioFormsModule,
    CommonModule,
    NotificationsModule,
    ReactiveFormsModule,
    UsersModule
  ],
  declarations: [
    RegistrationPageComponent
  ]
})
export class RegistrationPageModule { }
