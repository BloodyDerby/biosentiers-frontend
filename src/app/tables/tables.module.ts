import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap';

import { TableComponent } from './table.component';
import { TablePaginationComponent } from './table.pagination.component';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule
  ],
  declarations: [
    TableComponent,
    TablePaginationComponent
  ],
  exports: [
    TableComponent,
    TablePaginationComponent
  ]
})
export class TablesModule { }
