import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { BioAuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BioAuthService
  ]
})
export class BioAuthModule { }
