import { NgModule } from '@angular/core';
import { ChartsModule  } from 'ng2-charts';
import { TooltipModule } from 'ngx-bootstrap';

import { ApiModule } from '../api';
import { CommonModule } from '../common';
import { StatusModule } from '../status';
import { StatusPageComponent } from './status-page.component';
import { TitleModule } from '../title';

@NgModule({
  imports: [
    ApiModule,
    ChartsModule,
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
