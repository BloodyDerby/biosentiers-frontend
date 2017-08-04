import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { AuthModule } from '../auth';
import { ProfilePageComponent } from './profile-page.component';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    MomentModule,
    RouterModule,
    UsersModule
  ],
  declarations: [
    ProfilePageComponent
  ]
})
export class ProfilePageModule { }
