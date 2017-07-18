import compact from 'lodash/compact';
import includes from 'lodash/includes';

import { parsePropertiesInto } from '../utils/models';

export const roles: ReadonlyArray<string> = Object.freeze([ 'user', 'admin' ]);

export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  previousPassword: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'email', 'firstName', 'lastName', 'password', 'previousPassword', 'role', 'createdAt', 'updatedAt');
  }

  get fullName(): string {
    return compact([ this.firstName, this.lastName ]).join(' ');
  }

  hasRole(role: string): boolean {
    if (!includes(roles, role)) {
      throw new Error(`Unknown role ${role} (valid roles are ${roles.join(', ')})`);
    }

    const roleIndex = roles.indexOf(role),
          userRoleIndex = roles.indexOf(this.role);

    return roleIndex >= 0 && userRoleIndex >= 0 && userRoleIndex >= roleIndex;
  }
}
