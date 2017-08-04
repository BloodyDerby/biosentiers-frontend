import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth';
import { User } from '../models';

@Component({
  selector: 'bio-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.styl']
})
export class ProfileEditPageComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.userObs
      .first()
      .subscribe((user: User) => this.user = user);
  }

}
