import { Component, Input, OnInit } from '@angular/core';

import { TableConfig } from './table.config';
import { PaginatedResponse } from '../utils/api';

@Component({
  selector: 'bio-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent<T> {
  @Input()
  config: TableConfig<T>;
  @Input()
  pagination: boolean;

  ngOnInit() {
    this.config.changeState();
    this.pagination = this.pagination !== undefined ? this.pagination : true;
  }
}
