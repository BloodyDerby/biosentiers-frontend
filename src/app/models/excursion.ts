import { Trail } from './trail';
import { User } from './user';
import { parsePropertiesInto, parseRelationshipInto } from '../utils/models';

export class Excursion {

  id: string;
  href: string;
  name: string;
  trailHref: string;
  participantsCount: number;
  themes: string[];
  zones: number[];
  plannedAt: string;
  createdAt: string;
  updatedAt: string;

  creator: User;
  trail: Trail;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'href', 'name', 'trailHref', 'participantsCount', 'themes', 'zones', 'plannedAt', 'createdAt', 'updatedAt');
    parseRelationshipInto(this, 'creator', User, data);
    parseRelationshipInto(this, 'trail', Trail, data);
  }
}
