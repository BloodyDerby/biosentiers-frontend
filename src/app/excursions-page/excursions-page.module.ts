import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CommonModule } from '../common/common.module';
import { ExcursionsModule } from '../excursions';
import { ExcursionsPageComponent } from './excursions-page.component';
import { TableComponent } from '../tables/table.component';
import { TablesModule } from '../tables/tables.module';

@NgModule({
  imports: [
    CommonModule,
    ExcursionsModule,
    MomentModule,
    MyDateRangePickerModule,
    ReactiveFormsModule,
    RouterModule,
    TablesModule,
    TooltipModule
  ],
  declarations: [
    ExcursionsPageComponent
  ]
})
export class ExcursionsPageModule { }
