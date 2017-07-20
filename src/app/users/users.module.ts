import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { UserRolesComponent } from './user-roles.component';
import { UsersService } from './users.service';

@NgModule({
  declarations: [
    UserRolesComponent
  ],
  exports: [
    UserRolesComponent
  ],
  imports: [
    BioApiModule,
    CommonModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
