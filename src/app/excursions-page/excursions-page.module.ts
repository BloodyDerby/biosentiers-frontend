import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CommonModule } from '../common';
import { ExcursionsModule } from '../excursions';
import { ExcursionsPageComponent } from './excursions-page.component';
import { TablesModule } from '../tables';
import { TitleModule } from '../title';

@NgModule({
  imports: [
    CommonModule,
    ExcursionsModule,
    MomentModule,
    MyDateRangePickerModule,
    ReactiveFormsModule,
    RouterModule,
    TablesModule,
    TitleModule,
    TooltipModule
  ],
  declarations: [
    ExcursionsPageComponent
  ]
})
export class ExcursionsPageModule { }
