import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { BioParticipantsModule } from '../participants/participants.module';
import { ExcursionQrcodeComponent } from './excursion-qrcode.component';
import { PrintExcursionPageComponent } from './print-excursion-page.component';

@NgModule({
  imports: [
    BioExcursionsModule,
    BioParticipantsModule,
    CommonModule,
    RouterModule,
    TooltipModule
  ],
  declarations: [
    ExcursionQrcodeComponent,
    PrintExcursionPageComponent
  ]
})
export class PrintExcursionPageModule { }
