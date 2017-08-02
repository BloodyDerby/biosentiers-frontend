import { parsePropertiesInto } from '../utils/models';

export class Installation {
  id: string;
  href: string;
  properties: { [key: string]: string };
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'href', 'properties', 'createdAt', 'updatedAt');
  }
}
