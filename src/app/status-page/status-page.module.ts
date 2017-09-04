import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { ChartsModule  } from 'ng2-charts';
import { SelectModule } from 'ng-select';
import { TooltipModule } from 'ngx-bootstrap';

import { ApiModule } from '../api';
import { CommonModule } from '../common';
import { FormsModule } from '../forms';
import { StatusModule } from '../status';
import { StatusPageComponent } from './status-page.component';
import { TitleModule } from '../title';

@NgModule({
  imports: [
    ApiModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    MomentModule,
    ReactiveFormsModule,
    SelectModule,
    StatusModule,
    TitleModule,
    TooltipModule
  ],
  declarations: [
    StatusPageComponent
  ]
})
export class StatusPageModule { }
