import { parsePropertiesInto } from '../utils/models';

export class Trail {

  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'name', 'createdAt', 'updatedAt');
  }
}
