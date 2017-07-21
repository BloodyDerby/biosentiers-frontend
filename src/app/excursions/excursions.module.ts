import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet/dist';

import { BioApiModule } from '../api/api.module';
import { ExcursionPoisMapComponent } from './excursion-pois-map.component';
import { BioExcursionsService } from './excursions.service';

@NgModule({
  imports: [
    BioApiModule,
    CommonModule,
    LeafletModule
  ],
  declarations: [
    ExcursionPoisMapComponent
  ],
  exports: [
    ExcursionPoisMapComponent
  ],
  providers: [
    BioExcursionsService
  ]
})
export class BioExcursionsModule { }
