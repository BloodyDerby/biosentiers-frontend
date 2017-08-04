import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth';
import { ProfileEditPageComponent } from './profile-edit-page.component';
import { EditUserFormModule } from '../users-edit-form';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    EditUserFormModule,
    RouterModule
  ],
  declarations: [
    ProfileEditPageComponent
  ]
})
export class ProfileEditPageModule { }
