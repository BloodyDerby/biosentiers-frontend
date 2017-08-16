import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth';
import { User } from '../models';
import { TitleService } from '../title';

@Component({
  selector: 'bio-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.styl']
})
export class ProfileEditPageComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.setTitle([ 'Profil', 'Édition' ]);

    this.authService.userObs
      .first()
      .subscribe((user: User) => this.user = user);
  }

}
