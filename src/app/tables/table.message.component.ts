import { Component, ElementRef, Input } from '@angular/core';
import reduce from 'lodash/reduce';

import { TableFilters, TableManager } from './table.manager';
import { findClosestParent, findElement } from '../utils/dom';

@Component({
  selector: '[bio-table-message]',
  templateUrl: './table.message.component.html',
  styleUrls: ['./table.message.component.styl']
})
export class TableMessageComponent<T, F extends TableFilters> {
  colspan: number;

  @Input()
  autoColspan: boolean;

  @Input('bio-table-message')
  manager: TableManager<T, F>;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    if (!this.manager) {
      throw new Error('Table manager is required');
    } else if (this.element.nativeElement.tagName != 'TR') {
      throw new Error('Element must be a TR tag');
    }

    this.updateVisibility();
    this.manager.recordsObs.subscribe(records => this.updateVisibility(records));
    this.manager.loadingErrorObs.subscribe(err => this.updateVisibility());

    if (this.autoColspan === undefined || this.autoColspan) {
      this.initColspan();
    }
  }

  private updateVisibility(records?: any[]) {
    const visible = !!this.manager.loadingError || !records || !records.length;
    this.element.nativeElement.style.display = visible ? 'table-row' : 'none';
  }

  private initColspan() {

    const tr = this.element.nativeElement;
    if (tr.tagName != 'TR') {
      return;
    }

    const table = findClosestParent(tr, 'TABLE');
    const firstRow = findElement(table, 'TR');
    if (!firstRow) {
      return;
    }

    this.colspan = reduce(firstRow.children, (memo, tableCell) => {
      const cellColspan = tableCell.getAttribute('colspan');
      return memo + (cellColspan ? parseInt(cellColspan, 10) : 1);
    }, 0);
  }
}
