import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthApiService } from './auth.api.service';
import { BioAuthService } from './auth.service';
import { AuthViewService } from './auth.view.service';
import { BioStorageModule } from '../utils/storage/storage.module';
import { CanAccessPage } from './can-access-page';

@NgModule({
  imports: [
    BioStorageModule,
    RouterModule
  ],
  providers: [
    AuthApiService,
    AuthViewService,
    BioAuthService,
    CanAccessPage
  ]
})
export class BioAuthModule { }
