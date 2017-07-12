import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { PoisService } from './pois.service';

@NgModule({
  imports: [
    BioApiModule
  ],
  providers: [
    PoisService
  ]
})
export class PoisModule { }
