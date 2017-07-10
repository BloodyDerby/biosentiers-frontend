import { parsePropertiesInto } from '../utils/models';

export class Trail {

  id: string;
  href: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'href', 'name', 'createdAt', 'updatedAt');
  }
}
