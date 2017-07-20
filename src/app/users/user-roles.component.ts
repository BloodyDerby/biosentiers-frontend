import { Component, Input } from '@angular/core';

import { User } from '../models';

@Component({
  selector: 'bio-user-roles',
  templateUrl: './user-roles.component.html'
})
export class UserRolesComponent {

  @Input()
  user: User;

  constructor() {
  }

}
