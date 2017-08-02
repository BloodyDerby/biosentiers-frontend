import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { InstallationEventsService } from './installation-events.service';

@NgModule({
  imports: [
    BioApiModule
  ],
  providers: [
    InstallationEventsService
  ]
})
export class InstallationEventsModule { }
