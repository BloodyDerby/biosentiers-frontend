import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { TooltipModule } from 'ngx-bootstrap';

import { InvitationDialogModule } from '../invitation-dialog';
import { TablesModule } from '../tables';
import { UsersPageComponent } from './users-page.component';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    CommonModule,
    InvitationDialogModule,
    MomentModule,
    ReactiveFormsModule,
    RouterModule,
    TablesModule,
    TooltipModule,
    UsersModule
  ],
  declarations: [
    UsersPageComponent
  ]
})
export class UsersPageModule { }
