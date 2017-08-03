import reduce from 'lodash/reduce';

import { parsePropertiesInto } from '../utils/models';

export class InstallationEvent {
  id: string;
  href: string;
  type: string;
  version: string;
  properties: { [key: string]: string };
  createdAt: Date;
  occurredAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'href', 'type', 'version', 'properties', 'createdAt', 'occurredAt');
  }

  get propertiesArray() {
    return reduce(this.properties || {}, (memo, value, key) => {
      return [ ...memo, { key: key, value: value } ];
    }, []);
  }
}
