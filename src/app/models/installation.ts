import reduce from 'lodash/reduce';

import { Model } from './abstract';

export class Installation extends Model {
  id: string;
  href: string;
  properties: { [key: string]: string };
  eventsCount: number;
  createdAt: Date;
  updatedAt: Date;
  firstStartedAt: Date;
  lastEventAt: Date;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'id', 'href', 'properties', 'eventsCount', 'createdAt', 'updatedAt', 'firstStartedAt', 'lastEventAt');
  }

  get propertiesArray() {
    return reduce(this.properties || {}, (memo, value, key) => {
      return [ ...memo, { key: key, value: value } ];
    }, []);
  }
}
