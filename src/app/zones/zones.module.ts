import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet/dist';

import { ApiModule } from '../api';
import { ZoneListComponent } from './zone-list.component';
import { ZoneMapComponent } from './zone-map.component';
import { ZonesService } from './zones.service';

@NgModule({
  imports: [
    ApiModule,
    CommonModule,
    LeafletModule
  ],
  declarations: [
    ZoneListComponent,
    ZoneMapComponent
  ],
  exports: [
    ZoneListComponent,
    ZoneMapComponent
  ],
  providers: [
    ZonesService
  ]
})
export class ZonesModule { }
