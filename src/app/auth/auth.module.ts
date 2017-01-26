import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BioAuthService } from './auth.service';
import { BioStorageModule } from '../utils/storage/storage.module';

@NgModule({
  imports: [
    BioStorageModule
  ],
  providers: [
    BioAuthService
  ]
})
export class BioAuthModule { }
