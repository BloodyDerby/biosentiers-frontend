import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule  } from 'ng2-bootstrap/dropdown';

import { BioAuthModule } from '../auth/auth.module';
import { LoginModalModule } from '../login-modal/login-modal.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    BioAuthModule,
    CommonModule,
    DropdownModule.forRoot(),
    LoginModalModule,
    RouterModule
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