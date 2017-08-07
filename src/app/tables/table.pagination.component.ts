import { Component, Input } from '@angular/core';

import { TableFilters, TableManager } from './table.manager';
import { PaginatedResponse } from '../api';

const NUMBER_OF_PAGES = 5;

@Component({
  selector: 'bio-table-pagination',
  templateUrl: './table.pagination.component.html',
  styleUrls: ['./table.pagination.component.styl']
})
export class TablePaginationComponent<T, F extends TableFilters> {
  pages: number[];
  currentPage: number;
  lastPage: number;

  @Input()
  private manager: TableManager<T, F>;
  private limit: number;

  ngOnInit() {
    this.manager.resObs.subscribe((res: PaginatedResponse<T>) => this.updatePages(res));
  }

  goToPage(page: number) {
    if (!this.isPageEnabled(page) || !this.limit) {
      return;
    }

    this.manager.changeState({
      offset: (page - 1) * this.limit
    });
  }

  isPageEnabled(page: number) {
    return page !== this.currentPage && page >= 1 && page <= this.lastPage;
  }

  private updatePages(res: PaginatedResponse<T>) {

    this.limit = res.pagination.limit;
    let numberOfPages = NUMBER_OF_PAGES;
    this.currentPage = res.pagination.offset / res.pagination.limit + 1;
    this.lastPage = res.pagination.pagesCount;

    this.pages = [ this.currentPage ];
    numberOfPages--;

    let page = this.currentPage;
    while (page > 1 && numberOfPages > 0) {
      this.pages.unshift(--page);
      numberOfPages--;
    }

    page = this.currentPage;
    while (page < this.lastPage && numberOfPages > 0) {
      this.pages.push(++page);
      numberOfPages--;
    }
  }
}
