import * as _ from 'lodash';

export class User {

  static ROLES: Array<String> = [ 'user', 'admin' ];

  id: string;
  email: string;
  role: string;

  constructor(data: Object) {
    _.extend(this, _.pick(data || {}, 'id', 'email', 'role'));
  }

  hasRole(role) {

    const roleIndex = User.ROLES.indexOf(role),
          userRoleIndex = User.ROLES.indexOf(this.role);

    return roleIndex >= 0 && userRoleIndex >= 0 && userRoleIndex >= roleIndex;
  }
}
