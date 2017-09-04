import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import reduce from 'lodash/reduce';

import { Model } from './abstract';

export type ActivityInterval = 'hour' | 'day' | 'week' | 'month';
export type ActivitySubject = 'excursions' | 'installations' | 'installationEvents' | 'users';

export class ActivityValue extends Model {
  count: number;
  countedAt: Date;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'count', 'countedAt');
  }
}

export class Activity extends Model {
  interval: ActivityInterval;
  startedAt: Date;
  endedAt: Date;
  values: ActivityValue[];

  constructor(data?: any) {
    super();

    this.parseProperties(data, 'interval', 'startedAt', 'endedAt');

    if (data && isArray(data.values)) {
      this.values = data.values.map(value => new ActivityValue(value));
    }
  }
}
