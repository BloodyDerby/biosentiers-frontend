import isFunction from 'lodash/isFunction';
import { Observable } from 'rxjs/Rx';

export function toObservable<T>(value: Observable<T> | Promise<T> | T): Observable<T> {
  if (value instanceof Observable) {
    return value;
  } else if (value && isFunction(value['then'])) {
    return Observable.fromPromise(<Promise<T>>value);
  } else {
    return Observable.of(value);
  }
}
