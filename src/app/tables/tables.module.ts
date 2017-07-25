import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ErrorsModule } from '../errors';
import { TableComponent } from './table.component';
import { TableFiltersComponent } from './table.filters.component';
import { TableMessageComponent } from './table.message.component';
import { TablePaginationComponent } from './table.pagination.component';
import { TableSortComponent } from './table.sort.component';

@NgModule({
  imports: [
    CommonModule,
    ErrorsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  declarations: [
    TableComponent,
    TableFiltersComponent,
    TableMessageComponent,
    TablePaginationComponent,
    TableSortComponent
  ],
  exports: [
    TableComponent,
    TableFiltersComponent,
    TableMessageComponent,
    TablePaginationComponent,
    TableSortComponent
  ]
})
export class TablesModule { }
