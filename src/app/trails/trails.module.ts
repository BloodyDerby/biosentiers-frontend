import { NgModule } from '@angular/core';

import { ApiModule } from '../api';
import { TrailsService } from './trails.service';

@NgModule({
  imports: [
    ApiModule
  ],
  providers: [
    TrailsService
  ]
})
export class TrailsModule { }
