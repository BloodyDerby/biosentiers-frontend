import { Model } from './abstract';

export class ApiInfo extends Model {
  version: string;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'version');
  }
}
