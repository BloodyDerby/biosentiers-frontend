import { NgModule } from '@angular/core';
import { RequestBuilderModule } from 'ng-request-builder';

import { BioApiService } from './api.service';
import { BioAuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    BioAuthModule,
    RequestBuilderModule
  ],
  providers: [
    BioApiService
  ]
})
export class BioApiModule { }
