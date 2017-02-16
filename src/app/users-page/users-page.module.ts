import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationDialogModule } from '../invitation-dialog/invitation-dialog.module';
import { UsersPageComponent } from './users-page.component';

@NgModule({
  imports: [
    CommonModule,
    InvitationDialogModule
  ],
  declarations: [
    UsersPageComponent
  ]
})
export class UsersPageModule { }
