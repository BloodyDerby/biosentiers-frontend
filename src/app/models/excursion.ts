import extend from 'lodash/extend';
import pick from 'lodash/pick';

import { Trail } from './trail';

export class Excursion {

  id: string;
  name: string;
  trailId: string;
  plannedAt: string;
  createdAt: string;
  updatedAt: string;
  trail: Trail;

  constructor(data?: Object) {
    extend(this, pick(data || {}, 'id', 'name', 'trailId', 'plannedAt', 'createdAt', 'updatedAt'));
    // TODO: casting utility
    if (data && data['trail']) {
      this.trail = new Trail(data['trail']);
    }
  }
}
