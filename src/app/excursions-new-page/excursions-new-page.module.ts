import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { NewExcursionPageComponent } from './excursions-new-page.component';

@NgModule({
  imports: [
    CommonModule,
    BioExcursionsModule
  ],
  declarations: [
    NewExcursionPageComponent
  ]
})
export class NewExcursionPageModule { }
