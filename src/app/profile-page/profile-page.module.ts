import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { AuthModule } from '../auth';
import { ProfilePageComponent } from './profile-page.component';
import { TitleModule } from '../title';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    MomentModule,
    RouterModule,
    TitleModule,
    UsersModule
  ],
  declarations: [
    ProfilePageComponent
  ]
})
export class ProfilePageModule { }
