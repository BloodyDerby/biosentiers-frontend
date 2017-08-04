import { Model } from './abstract';

export class Invitation extends Model {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  link: string;
  sent: boolean;
  createdAt: Date;
  expiresAt: Date;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'email', 'role', 'firstName', 'lastName', 'link', 'sent', 'createdAt', 'expiresAt');
  }
}
