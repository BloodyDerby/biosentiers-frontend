import { NgModule } from '@angular/core';

import { ApiModule } from '../api';
import { InstallationEventsService } from './installation-events.service';

@NgModule({
  imports: [
    ApiModule
  ],
  providers: [
    InstallationEventsService
  ]
})
export class InstallationEventsModule { }
