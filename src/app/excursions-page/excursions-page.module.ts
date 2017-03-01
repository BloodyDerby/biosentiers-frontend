import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap/tooltip';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { ExcursionsPageComponent } from './excursions-page.component';

@NgModule({
  imports: [
    CommonModule,
    BioExcursionsModule,
    RouterModule,
    TooltipModule
  ],
  declarations: [
    ExcursionsPageComponent
  ]
})
export class ExcursionsPageModule { }
