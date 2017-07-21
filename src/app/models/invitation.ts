import { parsePropertiesInto } from '../utils/models';

export class Invitation {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  link: string;
  sent: boolean;
  createdAt: Date;
  expiresAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'email', 'role', 'firstName', 'lastName', 'link', 'sent', 'createdAt', 'expiresAt');
  }
}
