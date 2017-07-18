import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    BioApiModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
