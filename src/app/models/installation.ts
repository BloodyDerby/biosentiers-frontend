import reduce from 'lodash/reduce';

import { parsePropertiesInto } from '../utils/models';

export class Installation {
  id: string;
  href: string;
  properties: { [key: string]: string };
  eventsCount: number;
  createdAt: Date;
  updatedAt: Date;
  firstStartedAt: Date;
  lastEventAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'href', 'properties', 'eventsCount', 'createdAt', 'updatedAt', 'firstStartedAt', 'lastEventAt');
  }

  get propertiesArray() {
    return reduce(this.properties || {}, (memo, value, key) => {
      return [ ...memo, { key: key, value: value } ];
    }, []);
  }
}
