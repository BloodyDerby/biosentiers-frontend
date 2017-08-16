import { Component, OnInit } from '@angular/core';

import { AuthViewService } from '../auth';
import { TitleService } from '../title';

@Component({
  selector: 'bio-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.styl']
})
export class ProfilePageComponent implements OnInit {
  auth: AuthViewService;

  constructor(auth: AuthViewService, private titleService: TitleService) {
    this.auth = auth;
  }

  ngOnInit() {
    this.titleService.setTitle([ 'Profil' ]);
  }

}
