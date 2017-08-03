import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ShowInstallationEventDialogComponent } from './show-installation-event-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    MomentModule
  ],
  declarations: [
    ShowInstallationEventDialogComponent
  ],
  exports: [
    ShowInstallationEventDialogComponent
  ]
})
export class ShowInstallationEventDialogModule { }
