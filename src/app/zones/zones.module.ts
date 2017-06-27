import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { BioZonesService } from './zones.service';

@NgModule({
  imports: [
    BioApiModule
  ],
  providers: [
    BioZonesService
  ]
})
export class BioZonesModule { }
