import compact from 'lodash/compact';

import { parsePropertiesInto } from '../utils/models';

export class User {

  static ROLES: Array<string> = [ 'user', 'admin' ];

  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;

  constructor(data?: any) {
    parsePropertiesInto(this, data, 'id', 'email', 'firstName', 'lastName', 'role');
  }

  get fullName(): string {
    return compact([ this.firstName, this.lastName ]).join(' ');
  }

  hasRole(role: string): boolean {

    const roleIndex = User.ROLES.indexOf(role),
          userRoleIndex = User.ROLES.indexOf(this.role);

    return roleIndex >= 0 && userRoleIndex >= 0 && userRoleIndex >= roleIndex;
  }
}
