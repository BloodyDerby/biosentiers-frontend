import { NgModule } from '@angular/core';

import { ApiModule } from '../api';
import { AuthApiService } from './auth-api.service';

@NgModule({
  imports: [
    ApiModule
  ],
  providers: [
    AuthApiService
  ]
})
export class AuthApiModule { }
