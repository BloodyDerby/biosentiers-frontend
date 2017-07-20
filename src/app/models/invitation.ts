import { parsePropertiesInto } from '../utils/models';

export class Invitation {
  email: string;
  role: string;
  firstName: string;
  lastName: string;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'email', 'role', 'firstName', 'lastName');
  }
}
