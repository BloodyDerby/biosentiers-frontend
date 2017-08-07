import isFunction from 'lodash/isFunction';
import { Observable } from 'rxjs/Rx';

export function spread<T>(func: (...args: any[]) => Observable<T>): (...args: any[]) => Observable<T> {
  return (...args: any[]): Observable<T> => {
    return func(...[ ...args[0], ...args.slice(1) ]);
  };
}

export function toObservable<T>(value: Observable<T> | Promise<T> | T): Observable<T> {
  if (value && !(value instanceof Observable) && isFunction(value['then'])) {
    value = Promise.resolve(value);
  }

  if (value instanceof Observable) {
    return value;
  } else if (value instanceof Promise) {
    return Observable.fromPromise(<Promise<T>>value);
  } else {
    return Observable.of(value);
  }
}
