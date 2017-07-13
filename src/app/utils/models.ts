import each from 'lodash/each';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import moment from 'moment';

export function parsePropertiesInto(model, data?: any, ...properties) {
  each(pick(data || {}, ...properties), (value, key) => {
    if (key.toString().match(/[a-z]At$/)) {
      model[key] = moment(data[key]).toDate();
    } else {
      model[key] = value;
    }
  });
}

export function parseRelationshipInto(model, relation, relationModel, data?: any) {
  if (data && data[relation]) {
    model[relation] = new relationModel(data[relation]);
  }
}
