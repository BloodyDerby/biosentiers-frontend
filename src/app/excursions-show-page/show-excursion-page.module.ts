import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { TooltipModule } from 'ngx-bootstrap';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { ShowExcursionPageComponent } from './show-excursion-page.component';

@NgModule({
  imports: [
    CommonModule,
    BioExcursionsModule,
    MomentModule,
    RouterModule,
    TooltipModule
  ],
  declarations: [
    ShowExcursionPageComponent
  ]
})
export class ShowExcursionPageModule { }
