import { parsePropertiesInto } from '../utils/models';

export class Theme {

  name: string;
  description: string;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'name', 'description');
  }
}
