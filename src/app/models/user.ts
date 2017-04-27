import compact from 'lodash/compact';
import extend from 'lodash/extend';
import pick from 'lodash/pick';

export class User {

  static ROLES: Array<string> = [ 'user', 'admin' ];

  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;

  constructor(data: Object) {
    extend(this, pick(data || {}, 'id', 'email', 'firstName', 'lastName', 'role'));
  }

  get fullName(): string {
    return compact([ this.firstName, this.lastName ]).join(' ');
  }

  hasRole(role) {

    const roleIndex = User.ROLES.indexOf(role),
          userRoleIndex = User.ROLES.indexOf(this.role);

    return roleIndex >= 0 && userRoleIndex >= 0 && userRoleIndex >= roleIndex;
  }
}
