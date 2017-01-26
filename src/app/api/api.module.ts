import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BioApiService } from './api.service';
import { BioAuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    BioAuthModule,
    HttpModule
  ],
  providers: [
    BioApiService
  ]
})
export class BioApiModule { }
