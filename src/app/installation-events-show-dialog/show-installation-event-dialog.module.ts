import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ShowInstallationEventDialogComponent } from './show-installation-event-dialog.component';
import { TitleModule } from '../title';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    MomentModule,
    TitleModule
  ],
  declarations: [
    ShowInstallationEventDialogComponent
  ],
  exports: [
    ShowInstallationEventDialogComponent
  ]
})
export class ShowInstallationEventDialogModule { }
