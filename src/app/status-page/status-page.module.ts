import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap';

import { ApiModule } from '../api';
import { CommonModule } from '../common';
import { StatusModule } from '../status';
import { StatusPageComponent } from './status-page.component';
import { TitleModule } from '../title';

@NgModule({
  imports: [
    ApiModule,
    CommonModule,
    StatusModule,
    TitleModule,
    TooltipModule
  ],
  declarations: [
    StatusPageComponent
  ]
})
export class StatusPageModule { }
