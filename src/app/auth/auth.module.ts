import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthService } from './auth.service';
import { AuthViewService } from './auth.view.service';
import { StorageModule } from '../storage';
import { CanAccessPage } from './can-access-page';

@NgModule({
  imports: [
    RouterModule,
    StorageModule
  ],
  providers: [
    AuthService,
    AuthViewService,
    CanAccessPage
  ]
})
export class AuthModule { }
