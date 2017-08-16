import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth';
import { ProfileEditPageComponent } from './profile-edit-page.component';
import { TitleModule } from '../title';
import { EditUserFormModule } from '../users-edit-form';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    EditUserFormModule,
    RouterModule,
    TitleModule
  ],
  declarations: [
    ProfileEditPageComponent
  ]
})
export class ProfileEditPageModule { }
