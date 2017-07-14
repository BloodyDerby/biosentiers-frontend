import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap';

import { TableComponent } from './table.component';
import { TablePaginationComponent } from './table.pagination.component';
import { TableSortComponent } from './table.sort.component';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule
  ],
  declarations: [
    TableComponent,
    TablePaginationComponent,
    TableSortComponent
  ],
  exports: [
    TableComponent,
    TablePaginationComponent,
    TableSortComponent
  ]
})
export class TablesModule { }
