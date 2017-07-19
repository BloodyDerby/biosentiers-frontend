import { NgModule } from '@angular/core';
import { RequestBuilderModule } from 'ng-request-builder';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar/index';

import { BioApiService } from './api.service';
import { BioAuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    BioAuthModule,
    RequestBuilderModule,
    SlimLoadingBarModule
  ],
  providers: [
    BioApiService
  ]
})
export class BioApiModule { }
