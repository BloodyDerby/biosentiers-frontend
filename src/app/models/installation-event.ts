import reduce from 'lodash/reduce';

import { Model } from './abstract';

export class InstallationEvent extends Model {
  id: string;
  href: string;
  type: string;
  version: string;
  properties: { [key: string]: string };
  createdAt: Date;
  occurredAt: Date;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'id', 'href', 'type', 'version', 'properties', 'createdAt', 'occurredAt');
  }

  get propertiesArray() {
    return reduce(this.properties || {}, (memo, value, key) => {
      return [ ...memo, { key: key, value: value } ];
    }, []);
  }
}
