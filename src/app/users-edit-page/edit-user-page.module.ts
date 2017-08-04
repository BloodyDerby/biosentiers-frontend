import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap';

import { AuthModule } from '../auth';
import { EditUserPageComponent } from './edit-user-page.component';
import { UsersModule } from '../users';
import { EditUserFormModule } from '../users-edit-form';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    EditUserFormModule,
    RouterModule,
    TooltipModule,
    UsersModule
  ],
  declarations: [
    EditUserPageComponent
  ]
})
export class EditUserPageModule { }
