import { parseRelationshipInto, parsePropertiesInto } from '../utils/models';
import { User } from './user';

export class PasswordResetRequest {
  email: string;
  link: string;
  user: User;
  createdAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'email', 'link', 'createdAt');
    parseRelationshipInto(this, 'user', User, data);
  }
}
