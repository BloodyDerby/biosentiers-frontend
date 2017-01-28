import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BioAuthService } from './auth.service';
import { BioStorageModule } from '../utils/storage/storage.module';
import { CanAccessPage } from './can-access-page';

@NgModule({
  imports: [
    BioStorageModule
  ],
  providers: [
    BioAuthService,
    CanAccessPage
  ]
})
export class BioAuthModule { }
