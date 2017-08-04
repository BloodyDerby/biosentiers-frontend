import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';

import { AuthModule } from '../auth';
import { EditUserFormComponent } from './edit-user-form.component';
import { FormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    FormsModule,
    NotificationsModule,
    ReactiveFormsModule,
    SelectModule,
    UsersModule
  ],
  declarations: [
    EditUserFormComponent
  ],
  exports: [
    EditUserFormComponent
  ]
})
export class EditUserFormModule { }
