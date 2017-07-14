import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { PaginatedResponse } from '../utils/api';
import { triggerObservable } from '../utils/async';

export abstract class TableManager<T,F> {
  stateObs: Observable<TableState<F>>;
  resObs: Observable<PaginatedResponse<T>>;
  recordsObs: Observable<T[]>;
  effectiveTotalObs: Observable<number>;

  private stateSubject: ReplaySubject<TableState<F>>;
  private resSubject: ReplaySubject<PaginatedResponse<T>>;
  private state: TableState<F>;

  constructor() {
    this.state = this.getInitialState();

    this.stateSubject = new ReplaySubject<TableState<F>>(1);
    this.stateObs = this.stateSubject.asObservable();

    this.resSubject = new ReplaySubject<PaginatedResponse<T>>(1);
    this.resObs = this.resSubject.asObservable();

    this.recordsObs = this.resObs.map(res => res.records);
    this.effectiveTotalObs = this.resObs.map(res => res.pagination.effectiveTotal);
  }

  getInitialState(): TableState<F> {
    return {
      offset: 0,
      limit: 5
    };
  }

  initializeFilters(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({});
  }

  convertFilters(formValues: any): F {
    return formValues;
  }

  changeState(state?: TableState<F>): Observable<PaginatedResponse<T>> {
    if (state && state.offset !== undefined) {
      this.state.offset = state.offset;
    }

    if (state && state.limit !== undefined) {
      this.state.limit = state.limit;
    }

    if (state && state.sorts) {
      this.state.sorts = state.sorts;
    }

    if (state && state.filters) {
      this.state.filters = state.filters;
    }

    this.stateSubject.next(this.state);

    return triggerObservable<PaginatedResponse<T>>(this.retrieveCurrentPage());
  }

  retrieveCurrentPage(): Observable<PaginatedResponse<T>> {
    return this.retrievePage(this.state).do((res: PaginatedResponse<T>) => {
      this.resSubject.next(res);
    });
  }

  abstract retrievePage(state: TableState<F>): Observable<PaginatedResponse<T>>;
}

export interface TableState<F> {
  offset?: number;
  limit?: number;
  sorts?: TableSort[];
  filters?: F;
}

export interface TableSort {
  property?: string;
  direction?: string;
}
