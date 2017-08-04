import { Model } from './abstract';

export class Trail extends Model {
  id: string;
  href: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'id', 'href', 'name', 'createdAt', 'updatedAt');
  }
}
