import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet/dist';

import { ApiModule } from '../api';
import { ExcursionsService } from './excursions.service';

@NgModule({
  imports: [
    ApiModule,
    CommonModule
  ],
  providers: [
    ExcursionsService
  ]
})
export class ExcursionsModule { }
