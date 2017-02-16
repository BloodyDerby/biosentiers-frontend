import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { BioExcursionsService } from './excursions.service';

@NgModule({
  imports: [
    BioApiModule
  ],
  providers: [
    BioExcursionsService
  ]
})
export class BioExcursionsModule { }
