import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BioModalModule } from '../utils/modal/modal.module';
import { LoginModalModule } from '../login-modal/login-modal.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    BioModalModule,
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
