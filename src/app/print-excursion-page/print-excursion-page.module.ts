import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ExcursionsModule } from '../excursions';
import { ParticipantsModule } from '../participants';
import { ExcursionQrcodeComponent } from './excursion-qrcode.component';
import { PrintExcursionPageComponent } from './print-excursion-page.component';

@NgModule({
  imports: [
    ExcursionsModule,
    CommonModule,
    MomentModule,
    ParticipantsModule,
    RouterModule,
    TooltipModule
  ],
  declarations: [
    ExcursionQrcodeComponent,
    PrintExcursionPageComponent
  ]
})
export class PrintExcursionPageModule { }
