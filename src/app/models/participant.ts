import { Model } from './abstract';

export class Participant extends Model {
  id: string;
  name: string;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'id', 'name');
  }
}
