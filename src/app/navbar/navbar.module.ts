import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BioAuthModule } from '../auth/auth.module';
import { LoginModalModule } from '../login-modal/login-modal.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    BioAuthModule,
    CommonModule,
    LoginModalModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
  ]
})
export class NavbarModule { }
