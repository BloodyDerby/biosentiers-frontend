import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QRCodeComponent } from 'ng2-qrcode'

import { BioExcursionsModule } from '../excursions/excursions.module';
import { BioParticipantsModule } from '../participants/participants.module';
import { PrintExcursionPageComponent } from './print-excursion-page.component';

@NgModule({
  imports: [
    BioExcursionsModule,
    BioParticipantsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    PrintExcursionPageComponent,
    QRCodeComponent
  ]
})
export class PrintExcursionPageModule { }
