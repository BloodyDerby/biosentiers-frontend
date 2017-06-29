import { parsePropertiesInto } from '../utils/models';

export class Participant {

  id: string;
  name: string;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'name');
  }
}
