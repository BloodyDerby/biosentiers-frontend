import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';

import { BioAuthModule } from '../auth';
import { EditUserFormComponent } from './edit-user-form.component';
import { BioFormsModule } from '../forms';
import { NotificationsModule } from '../notifications';
import { UsersModule } from '../users';

@NgModule({
  imports: [
    BioAuthModule,
    BioFormsModule,
    CommonModule,
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
