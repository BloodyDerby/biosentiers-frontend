import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { ExcursionsPageComponent } from './excursions-page.component';

@NgModule({
  imports: [
    CommonModule,
    BioExcursionsModule
  ],
  declarations: [
    ExcursionsPageComponent
  ]
})
export class ExcursionsPageModule { }
