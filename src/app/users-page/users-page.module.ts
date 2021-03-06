import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { TooltipModule } from 'ngx-bootstrap';

import { TablesModule } from '../tables';
import { TitleModule } from '../title';
import { UsersPageComponent } from './users-page.component';
import { UsersModule } from '../users';
import { InvitationDialogModule } from '../users-invitation-dialog';

@NgModule({
  imports: [
    CommonModule,
    InvitationDialogModule,
    MomentModule,
    ReactiveFormsModule,
    RouterModule,
    TablesModule,
    TitleModule,
    TooltipModule,
    UsersModule
  ],
  declarations: [
    UsersPageComponent
  ]
})
export class UsersPageModule { }
