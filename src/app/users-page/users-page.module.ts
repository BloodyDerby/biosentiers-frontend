import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationDialogModule } from '../invitation-dialog/invitation-dialog.module';
import { UsersPageComponent } from './users-page.component';
import { UsersPageRoutingModule } from './users-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InvitationDialogModule,
    UsersPageRoutingModule
  ],
  declarations: [
    UsersPageComponent
  ]
})
export class UsersPageModule { }
