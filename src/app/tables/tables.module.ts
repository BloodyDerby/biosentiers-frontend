import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { TableComponent } from './table.component';
import { TableFiltersComponent } from './table.filters.component';
import { TablePaginationComponent } from './table.pagination.component';
import { TableSortComponent } from './table.sort.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  declarations: [
    TableComponent,
    TableFiltersComponent,
    TablePaginationComponent,
    TableSortComponent
  ],
  exports: [
    TableComponent,
    TableFiltersComponent,
    TablePaginationComponent,
    TableSortComponent
  ]
})
export class TablesModule { }
