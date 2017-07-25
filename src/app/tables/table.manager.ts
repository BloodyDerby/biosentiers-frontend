import { FormBuilder, FormGroup } from '@angular/forms';
import isEmpty from 'lodash/isEmpty';
import { Observable, ReplaySubject, Subject } from 'rxjs/Rx';

import { PaginatedResponse } from '../utils/api';
import { triggerObservable } from '../utils/async';

export abstract class TableManager<T,F extends TableFilters> {
  initialized: boolean;
  recordsInitialized: boolean;
  stateObs: Observable<TableState<F>>;
  resObs: Observable<PaginatedResponse<T>>;
  recordsObs: Observable<T[]>;
  effectiveTotalObs: Observable<number>;
  loadingError: Error;
  loadingErrorObs: Observable<Error>;

  private loadingErrorSubject: Subject<Error>;
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

    this.loadingErrorSubject = new Subject<Error>();
    this.loadingErrorObs = this.loadingErrorSubject.asObservable();
  }

  getInitialState(): TableState<F> {
    return {
      offset: 0,
      limit: 10
    };
  }

  initializeFilters(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({});
  }

  hasFilters(): boolean {
    return !!this.state.filters && !this.state.filters.isEmpty();
  }

  convertFilters(formValues: any): F {
    return formValues;
  }

  changeState(state?: TableState<F>): Observable<PaginatedResponse<T>> {
    if (!this.initialized) {
      this.initialized = true;
    }

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
    delete this.loadingError;
    return this.retrievePage(this.state).do((res: PaginatedResponse<T>) => {
      this.resSubject.next(res);
      this.recordsInitialized = true;
    }, err => {
      this.loadingError = err;
      this.loadingErrorSubject.next(err);
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

export interface TableFilters {
  isEmpty(): boolean;
}
