import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { BioTrailsService } from './trails.service';

@NgModule({
  imports: [
    BioApiModule
  ],
  providers: [
    BioTrailsService
  ]
})
export class BioTrailsModule { }
