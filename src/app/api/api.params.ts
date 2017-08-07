import { RequestOptions, URLSearchParams } from '@angular/http';
import extend from 'lodash/extend';
import isArray from 'lodash/isArray';
import keys from 'lodash/keys';
import pick from 'lodash/pick';

import { TableState } from '../tables';

export function apiQueryParamsModifier(params?: any) {
  return function(options: RequestOptions) {
    if (!params) {
      return;
    }

    options.search = options.search || new URLSearchParams();

    for (let key in params) {

      let values = params[key];
      if (!isArray(values)) {
        values = [ values ];
      }

      if (key.match(/^include[A-Z].+$/) && values.length == 1 && values[0] === true) {
        values = [ key.charAt(7).toLowerCase() + key.substring(8, key.length) ];
        key = 'include';
      }

      values.forEach(value => {
        if (typeof(value) == 'function') {
          value(options, value, key);
        } else if (value instanceof Date) {
          options.search.append(key, value.toISOString());
        } else if (typeof(value.apply) == 'function') {
          value.apply(options, key);
        } else if (value !== undefined && value !== null && value != '') {
          options.search.append(key, value.toString());
        }
      });
    }
  };
}

export function tableStateToApiQueryParams<T extends ApiQueryParams>(state: TableState<T>) {
  const sorts = state.sorts.map(sort => `${sort.property}-${sort.direction || 'asc'}`);
  return extend(pick(state, 'offset', 'limit'), { sort: sorts }, state.filters.toParams());
}

export interface ApiQueryParams {
  toParams(): any;
}

export interface ApiQueryParam {
  apply(options: RequestOptions, key: string);
}

// Separate pagination & sort params
export interface PaginationParams {
  offset?: number;
  limit?: number;
  sort?: string | string[];
}

export enum ComparisonOperator {
  EqualTo,
  GreaterThan,
  GreaterThanOrEqualTo,
  LessThan,
  LessThanOrEqualTo
}

export class ComparisonParam<T> implements ApiQueryParam {
  operator: ComparisonOperator;
  value: T;

  constructor(operator: ComparisonOperator, value: T) {
    this.operator = operator;
    this.value = value;
  }

  apply(options: RequestOptions, key: string) {
    options.search.append(`${key}${this.serializeOperator()}`, this.serializeValue());
  }

  serializeOperator(): string {
    switch (this.operator) {
      case ComparisonOperator.EqualTo:
        return '';
      case ComparisonOperator.GreaterThan:
        return 'Gt';
      case ComparisonOperator.GreaterThanOrEqualTo:
        return 'Gte';
      case ComparisonOperator.LessThan:
        return 'Lt';
      case ComparisonOperator.LessThanOrEqualTo:
        return 'Lte';
      default:
        throw new Error(`Unsupported comparison operator ${this.operator}`);
    }
  }

  serializeValue(): string {
    return this.value.toString();
  }
}

export class DateComparisonParam extends ComparisonParam<Date> {
  serializeValue(): string {
    return this.value.toISOString();
  }
}
