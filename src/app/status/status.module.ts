import { NgModule } from '@angular/core';

import { ApiModule } from '../api';
import { StatusService } from './status.service';

@NgModule({
  providers: [
    ApiModule,
    StatusService
  ]
})
export class StatusModule { }
