import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BioApiModule } from '../api';
import { StatusPageComponent } from './status-page.component';

@NgModule({
  imports: [
    BioApiModule,
    CommonModule
  ],
  declarations: [
    StatusPageComponent
  ]
})
export class StatusPageModule { }
