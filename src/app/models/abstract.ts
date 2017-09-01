import each from 'lodash/each';
import extend from 'lodash/extend';
import isPlainObject from 'lodash/isPlainObject';
import pick from 'lodash/pick';
import moment from 'moment';

export type ModelSerializer<T> = (model: T, result: any) => void;
export type ModelValueSerializer<T> = (model: T) => any;
export type ModelPropertySerializers<T> = { [key: string]: string | ModelValueSerializer<T> };
export type ModelJsonSerializer<T> = string | ModelSerializer<T> | ModelPropertySerializers<T>;

export abstract class Model {
  propertiesToJson(...properties: ModelJsonSerializer<this>[]): any {

    const result = {};
    each(properties, property => {
      if (typeof(property) == 'string') {
        result[property] = this[property];
      } else if (typeof(property) == 'function') {
        property(this, result);
      } else if (isPlainObject(property)) {
        each(property, (value, key) => {
          if (typeof(value) == 'string') {
            result[key] = this[value];
          } else if (typeof(value) == 'function') {
            result[key] = value(this);
          } else {
            throw new Error('Property value must be a string or a function');
          }
        });
      } else {
        throw new Error(`Unsupported property serializer ${property}; must be a string, function or object`)
      }
    });

    return result;
  }

  parseProperties(data?: any, ...properties: string[]) {
    each(pick(data || {}, ...properties), (value, key) => {
      if (key.toString().match(/[a-z]At$/)) {
        this[key] = moment(data[key]).toDate();
      } else {
        this[key] = value;
      }
    });
  }

  parseRelationship<T>(relation: string, relationModel: new(data?: any) => T, data?: any) {
    if (data && data[relation]) {
      this[relation] = new relationModel(data[relation]);
    }
  }
}
