import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';

import { BioAuthModule } from '../auth/auth.module';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  imports: [
    BioAuthModule,
    CommonModule,
    MomentModule,
    RouterModule
  ],
  declarations: [
    ProfilePageComponent
  ]
})
export class ProfilePageModule { }
