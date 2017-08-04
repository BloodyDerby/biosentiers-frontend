import compact from 'lodash/compact';
import includes from 'lodash/includes';

import { Model } from './abstract';

export const roles: ReadonlyArray<string> = Object.freeze([ 'user', 'admin' ]);

export class User extends Model {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  active: boolean;
  loginCount: number;
  firstActivatedAt: Date;
  lastActiveAt: Date;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: any) {
    super();
    this.parseProperties(data, 'id', 'email', 'firstName', 'lastName', 'role', 'active', 'loginCount', 'firstActivatedAt', 'lastActiveAt', 'lastLoginAt', 'createdAt', 'updatedAt');
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
