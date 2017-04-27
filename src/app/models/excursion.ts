import extend from 'lodash/extend';
import pick from 'lodash/pick';

import { Trail } from './trail';
import { User } from './user';

export class Excursion {

  id: string;
  name: string;
  trailId: string;
  themes: Array<string>;
  zones: Array<number>;
  plannedAt: string;
  createdAt: string;
  updatedAt: string;

  creator: User;
  trail: Trail;

  constructor(data?: Object) {
    extend(this, pick(data || {}, 'id', 'name', 'trailId', 'themes', 'zones', 'plannedAt', 'createdAt', 'updatedAt'));

    // TODO: casting utility
    if (data && data['creator']) {
      this.creator = new User(data['creator']);
    }

    if (data && data['trail']) {
      this.trail = new Trail(data['trail']);
    }
  }
}
