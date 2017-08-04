import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet/dist';

import { ExcursionPoisMapComponent } from './excursion-pois-map.component';
import { PoisModule } from '../pois';
import { ZonesModule } from '../zones';

@NgModule({
  imports: [
    CommonModule,
    LeafletModule,
    PoisModule,
    ZonesModule
  ],
  declarations: [
    ExcursionPoisMapComponent
  ],
  exports: [
    ExcursionPoisMapComponent
  ]
})
export class ExcursionComponentsModule { }
