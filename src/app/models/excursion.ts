import extend from 'lodash/extend';
import pick from 'lodash/pick';

export class Excursion {

  id: string;
  plannedAt: string;

  constructor(data?: Object) {
    extend(this, pick(data || {}, 'id', 'plannedAt'));
  }
}
