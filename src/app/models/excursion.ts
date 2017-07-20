import extend from 'lodash/extend';
import moment from 'moment';

import { Trail } from './trail';
import { User } from './user';
import { parsePropertiesInto, parseRelationshipInto, toJson } from '../utils/models';

export class Excursion {

  id: string;
  href: string;
  name: string;
  trailHref: string;
  participantsCount: number;
  themes: string[];
  zoneHrefs: string[];
  plannedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  creator: User;
  trail: Trail;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'href', 'name', 'trailHref', 'participantsCount', 'themes', 'zoneHrefs', 'plannedAt', 'createdAt', 'updatedAt');
    parseRelationshipInto(this, 'creator', User, data);
    parseRelationshipInto(this, 'trail', Trail, data);
  }

  isComplete(): boolean {
    return !!this.id && !!this.participantsCount && !!this.themes.length && !! this.zoneHrefs.length;
  }

  toJson(): any {
    return toJson(this, 'name', 'trailHref', 'themes', 'zoneHrefs', {
      plannedAt: () => moment(this.plannedAt).format()
    });
  }
}
