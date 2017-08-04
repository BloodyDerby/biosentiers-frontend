import { NgModule } from '@angular/core';

import { ApiModule } from '../api';
import { PoisService } from './pois.service';

@NgModule({
  imports: [
    ApiModule
  ],
  providers: [
    PoisService
  ]
})
export class PoisModule { }
