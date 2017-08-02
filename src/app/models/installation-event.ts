import { parsePropertiesInto } from '../utils/models';

export class InstallationEvent {
  id: string;
  href: string;
  type: string;
  version: string;
  properties: { [key: string]: string };
  createdAt: Date;
  occurredAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'href', 'type', 'version', 'properties', 'createdAt', 'occurredAt');
  }
}
