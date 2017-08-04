import { Model } from './abstract';
import { User } from './user';

export class PasswordResetRequest extends Model {
  email: string;
  link: string;
  user: User;
  createdAt: Date;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'email', 'link', 'createdAt');
    this.parseRelationship('user', User, data);
  }
}
