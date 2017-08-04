import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiModule } from '../api';
import { FormsModule } from '../forms';
import { UserRolesComponent } from './user-roles.component';
import { UserValidationsService } from './user-validations.service';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    ApiModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    UserRolesComponent
  ],
  exports: [
    UserRolesComponent
  ],
  providers: [
    UserValidationsService,
    UsersService
  ]
})
export class UsersModule { }
