import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angular2-qrcode';
import { RouterModule } from '@angular/router';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { BioParticipantsModule } from '../participants/participants.module';
import { PrintExcursionPageComponent } from './print-excursion-page.component';

@NgModule({
  imports: [
    BioExcursionsModule,
    BioParticipantsModule,
    CommonModule,
    QRCodeModule,
    RouterModule
  ],
  declarations: [
    PrintExcursionPageComponent
  ]
})
export class PrintExcursionPageModule { }
