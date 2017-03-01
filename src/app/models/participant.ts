import extend from 'lodash/extend';
import pick from 'lodash/pick';

export class Participant {

  id: string;
  name: string;

  constructor(data?: Object) {
    extend(this, pick(data || {}, 'id', 'name'));
  }
}
