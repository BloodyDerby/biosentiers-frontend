import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SelectModule } from 'ng-select';

import { BioApiModule } from '../api/api.module';
import { InvitationDialogComponent } from './invitation-dialog.component';

@NgModule({
  declarations: [
    InvitationDialogComponent
  ],
  exports: [
    InvitationDialogComponent
  ],
  imports: [
    BioApiModule,
    CommonModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    SelectModule
  ]
})
export class InvitationDialogModule { }
