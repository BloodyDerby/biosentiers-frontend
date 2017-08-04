import { Headers, RequestOptions, Response } from '@angular/http';
import { RequestBuilder } from 'ng-request-builder';
import { Observable } from 'rxjs/Rx';

import { TableSort } from '../tables';

export interface PaginationParams {
  offset?: number;
  limit?: number;
  sorts?: TableSort[];
}

export function applyPaginationParams(params: PaginationParams, options: RequestOptions) {
  if (!params) {
    return;
  }

  if (params.offset !== undefined) {
    options.search.append('offset', params.offset.toString());
  }

  if (params.limit !== undefined) {
    options.search.append('limit', params.limit.toString());
  }

  if (params.sorts) {
    params.sorts.forEach((sort: TableSort) => {
      options.search.append('sort', `${sort.property}-${sort.direction}`);
    });
  }
}

export function retrieveAllRecursive<T>(builder: RequestBuilder, converter: (data: any) => T, batchSize: number = 100, offset: number = 0, records: T[] = []): Observable<T[]> {
  return builder
    .setSearchParam('offset', offset.toString())
    .setSearchParam('limit', batchSize.toString())
    .execute()
    .switchMap(res => {

      const body = res.json();
      records = records.concat(body.map(data => converter(data)));

      const pagination: PaginationData = new PaginationData(res);
      if (pagination.hasMore() && (offset / batchSize < 100)) {
        return retrieveAllRecursive(builder, converter, batchSize, offset + body.length, records);
      } else {
        return Observable.of(records);
      }
    });
}

export class PaginatedResponse<T> {
  static head<T>(res: Response) {
    return new PaginatedResponse<T>(res, undefined, false);
  }

  records: T[];
  pagination: PaginationData;

  constructor(res: Response, converter: (data?: any) => T = (data?: any) => data, parse: boolean = true) {
    this.pagination = new PaginationData(res);
    if (parse) {
      this.records = res.json().map(data => converter(data));
    }
  }
}

export class PaginationData {
  offset: number;
  limit: number;
  total: number;
  filtered?: number;

  constructor(res: Response) {
    const headers: Headers = res.headers;
    this.offset = parsePaginationHeader(headers, 'Offset');
    this.limit = parsePaginationHeader(headers, 'Limit');
    this.total = parsePaginationHeader(headers, 'Total');
    this.filtered = parsePaginationHeader(headers, 'Filtered', false);
  }

  get pagesCount(): number {
    return Math.ceil(this.effectiveTotal / this.limit);
  }

  get effectiveTotal(): number {
    return this.filtered !== undefined ? this.filtered : this.total;
  }

  hasMore(): boolean {
    return this.offset + this.limit < this.effectiveTotal;
  }
}

function parsePaginationHeader(headers: Headers, name: string, required: boolean = true): number {

  const value = headers.get(`Pagination-${name}`);
  if (required && !value) {
    throw new Error(`Header Pagination-${name} was expected in the HTTP response but was not found`);
  }

  return parseInt(value, 10);
}
