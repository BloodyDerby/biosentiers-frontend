import { parsePropertiesInto } from '../utils/models';

export class ApiInfo {
  version: string;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'version');
  }
}
