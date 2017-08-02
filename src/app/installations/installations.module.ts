import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { InstallationsService } from './installations.service';

@NgModule({
  imports: [
    BioApiModule
  ],
  providers: [
    InstallationsService
  ]
})
export class InstallationsModule { }
