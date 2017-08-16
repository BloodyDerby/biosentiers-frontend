import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap';

import { AuthModule } from '../auth';
import { EditUserPageComponent } from './edit-user-page.component';
import { TitleModule } from '../title';
import { UsersModule } from '../users';
import { EditUserFormModule } from '../users-edit-form';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    EditUserFormModule,
    RouterModule,
    TitleModule,
    TooltipModule,
    UsersModule
  ],
  declarations: [
    EditUserPageComponent
  ]
})
export class EditUserPageModule { }
