import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BioApiModule } from '../api/api.module';
import { BioAuthModule } from '../auth/auth.module';
import { BioFormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { RegistrationPageComponent } from './registration-page.component';

@NgModule({
  imports: [
    BioApiModule,
    BioAuthModule,
    BioFormsModule,
    CommonModule,
    NotificationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegistrationPageComponent
  ]
})
export class RegistrationPageModule { }
