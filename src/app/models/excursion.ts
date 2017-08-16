import moment from 'moment';

import { Model } from './abstract';
import { Trail } from './trail';
import { User } from './user';

export class Excursion extends Model {
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
    super();
    this.parseProperties(data, 'id', 'href', 'name', 'trailHref', 'participantsCount', 'themes', 'zoneHrefs', 'plannedAt', 'createdAt', 'updatedAt');
    this.parseRelationship('creator', User, data);
    this.parseRelationship('trail', Trail, data);
  }

  get pageTitle() {
    return this.name || moment(this.plannedAt).format('ll');
  }

  isComplete(): boolean {
    return !!this.id && !!this.participantsCount && !!this.themes.length && !! this.zoneHrefs.length;
  }

  toJson(): any {
    return this.propertiesToJson('name', 'trailHref', 'themes', 'zoneHrefs', {
      plannedAt: () => moment(this.plannedAt).format()
    });
  }
}
