import { NgModule } from '@angular/core';
import { RequestBuilderModule } from 'ng-request-builder';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar/index';

import { ApiService } from './api.service';
import { AuthModule } from '../auth';

@NgModule({
  imports: [
    AuthModule,
    RequestBuilderModule,
    SlimLoadingBarModule
  ],
  providers: [
    ApiService
  ]
})
export class ApiModule { }
