import each from 'lodash/each';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import moment from 'moment';

export function toJson(model, ...properties) {

  const result = {};
  each(properties, property => {
    if (typeof(property) == 'string') {
      result[property] = model[property];
    } else if (typeof(property) == 'function') {
      property(model, result);
    } else {
      each(property, (value, key) => {
        if (typeof(value) == 'string') {
          result[key] = model[value];
        } else if (typeof(value) == 'function') {
          result[key] = value(model);
        } else {
          throw new Error('Property value must be a string or a function');
        }
      });
    }
  });

  return result;
}

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
