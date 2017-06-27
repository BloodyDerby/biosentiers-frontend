import extend from 'lodash/extend';
import pick from 'lodash/pick';

export class Theme {

  name: string;
  description: string;

  constructor(data?: Object) {
    extend(this, pick(data || {}, 'name', 'description'));
  }
}
