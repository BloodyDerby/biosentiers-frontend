import extend from 'lodash/extend';
import { environment as commonEnvironment } from './environment.common';

export const environment = extend(commonEnvironment, {
  production: true
});
