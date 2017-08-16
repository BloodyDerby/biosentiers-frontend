import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiModule } from '../api';
import { StatusPageComponent } from './status-page.component';
import { TitleModule } from '../title';

@NgModule({
  imports: [
    ApiModule,
    CommonModule,
    TitleModule
  ],
  declarations: [
    StatusPageComponent
  ]
})
export class StatusPageModule { }
