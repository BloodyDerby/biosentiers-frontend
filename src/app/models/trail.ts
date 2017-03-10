import extend from 'lodash/extend';
import pick from 'lodash/pick';

export class Trail {

  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  constructor(data?: Object) {
    extend(this, pick(data || {}, 'id', 'name', 'createdAt', 'updatedAt'));
  }
}
