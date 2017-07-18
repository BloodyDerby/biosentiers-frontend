import { parsePropertiesInto } from '../utils/models';

export class PasswordResetRequest {
  email: string;
  createdAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'email', 'createdAt');
  }
}
