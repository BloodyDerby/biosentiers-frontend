import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule  } from 'ngx-bootstrap/dropdown';

import { AuthModule } from '../auth';
import { LoginModalModule } from '../login-modal';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    BsDropdownModule.forRoot(),
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
