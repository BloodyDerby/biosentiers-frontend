import { Observable, ReplaySubject } from 'rxjs/Rx';

import { PaginatedResponse } from '../utils/api';
import { triggerObservable } from '../utils/async';

export abstract class TableConfig<T> {
  resObs: Observable<PaginatedResponse<T>>;
  recordsObs: Observable<T[]>;
  effectiveTotalObs: Observable<number>;
  private resSubject: ReplaySubject<PaginatedResponse<T>>;
  private state: TableState;

  constructor() {
    this.state = {
      offset: 0,
      limit: 2
    };

    this.resSubject = new ReplaySubject<PaginatedResponse<T>>(1);
    this.resObs = this.resSubject.asObservable();
    this.recordsObs = this.resObs.map(res => res.records);
    this.effectiveTotalObs = this.resObs.map(res => res.pagination.effectiveTotal);
  }

  changeState(state?: TableState): Observable<PaginatedResponse<T>> {
    if (state && state.offset !== undefined) {
      this.state.offset = state.offset;
    }

    if (state && state.limit !== undefined) {
      this.state.limit = state.limit;
    }

    return triggerObservable<PaginatedResponse<T>>(this.retrieveCurrentPage());
  }

  retrieveCurrentPage(): Observable<PaginatedResponse<T>> {
    return this.retrievePage(this.state.offset, this.state.limit).do((res: PaginatedResponse<T>) => {
      this.resSubject.next(res);
    });
  }

  abstract retrievePage(offset: number, limit: number): Observable<PaginatedResponse<T>>;
}

export interface TableState {
  offset?: number;
  limit?: number;
}
