import isFunction from 'lodash/isFunction';
import { Observable } from 'rxjs/Rx';

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

export function triggerObservable<T>(obs: Observable<T>) {
  return Observable.fromPromise(obs.toPromise());
}
