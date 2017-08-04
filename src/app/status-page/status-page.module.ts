import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiModule } from '../api';
import { StatusPageComponent } from './status-page.component';

@NgModule({
  imports: [
    ApiModule,
    CommonModule
  ],
  declarations: [
    StatusPageComponent
  ]
})
export class StatusPageModule { }
