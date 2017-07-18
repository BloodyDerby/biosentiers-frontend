import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { BioAuthModule } from '../auth/auth.module';
import { BioFormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { ProfileEditPageComponent } from './profile-edit-page.component';
import { UsersModule } from '../users/users.module';

@NgModule({
  imports: [
    BioAuthModule,
    BioFormsModule,
    CommonModule,
    MomentModule,
    NotificationsModule,
    ReactiveFormsModule,
    RouterModule,
    UsersModule
  ],
  declarations: [
    ProfileEditPageComponent
  ]
})
export class ProfileEditPageModule { }
