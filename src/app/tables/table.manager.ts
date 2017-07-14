import { Observable, ReplaySubject } from 'rxjs/Rx';

import { PaginatedResponse } from '../utils/api';
import { triggerObservable } from '../utils/async';

export abstract class TableManager<T> {
  stateObs: Observable<TableState>;
  resObs: Observable<PaginatedResponse<T>>;
  recordsObs: Observable<T[]>;
  effectiveTotalObs: Observable<number>;

  private stateSubject: ReplaySubject<TableState>;
  private resSubject: ReplaySubject<PaginatedResponse<T>>;
  private state: TableState;

  constructor() {
    this.state = this.getInitialState();

    this.stateSubject = new ReplaySubject<TableState>(1);
    this.stateObs = this.stateSubject.asObservable();

    this.resSubject = new ReplaySubject<PaginatedResponse<T>>(1);
    this.resObs = this.resSubject.asObservable();

    this.recordsObs = this.resObs.map(res => res.records);
    this.effectiveTotalObs = this.resObs.map(res => res.pagination.effectiveTotal);
  }

  getInitialState(): TableState {
    return {
      offset: 0,
      limit: 2
    };
  }

  changeState(state?: TableState): Observable<PaginatedResponse<T>> {
    if (state && state.offset !== undefined) {
      this.state.offset = state.offset;
    }

    if (state && state.limit !== undefined) {
      this.state.limit = state.limit;
    }

    if (state && state.sorts) {
      this.state.sorts = state.sorts;
    }

    this.stateSubject.next(this.state);

    return triggerObservable<PaginatedResponse<T>>(this.retrieveCurrentPage());
  }

  retrieveCurrentPage(): Observable<PaginatedResponse<T>> {
    return this.retrievePage(this.state).do((res: PaginatedResponse<T>) => {
      this.resSubject.next(res);
    });
  }

  abstract retrievePage(state: TableState): Observable<PaginatedResponse<T>>;
}

export interface TableState {
  offset?: number;
  limit?: number;
  sorts?: TableSort[];
}

export interface TableSort {
  property?: string;
  direction?: string;
}
