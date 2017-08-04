import { NgModule } from '@angular/core';

import { ApiModule } from '../api';
import { InstallationsService } from './installations.service';

@NgModule({
  imports: [
    ApiModule
  ],
  providers: [
    InstallationsService
  ]
})
export class InstallationsModule { }
