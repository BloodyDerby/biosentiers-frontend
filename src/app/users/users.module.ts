import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { BioFormsModule } from '../forms';
import { UserRolesComponent } from './user-roles.component';
import { UserValidationsService } from './user-validations.service';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    BioApiModule,
    BioFormsModule,
    CommonModule
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
