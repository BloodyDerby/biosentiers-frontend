import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet/dist';

import { BioApiModule } from '../api/api.module';
import { ZoneListComponent } from './zone-list.component';
import { ZoneMapComponent } from './zone-map.component';
import { BioZonesService } from './zones.service';

@NgModule({
  imports: [
    BioApiModule,
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
    BioZonesService
  ]
})
export class BioZonesModule { }
