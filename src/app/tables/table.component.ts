import { Component, Input, OnInit } from '@angular/core';

import { TableFilters, TableManager } from './table.manager';
import { PaginatedResponse } from '../utils/api';

@Component({
  selector: 'bio-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent<T, F extends TableFilters> {
  @Input()
  manager: TableManager<T, F>;
  @Input()
  pagination: boolean;

  ngOnInit() {
    this.pagination = this.pagination !== undefined ? this.pagination : true;
  }
}
