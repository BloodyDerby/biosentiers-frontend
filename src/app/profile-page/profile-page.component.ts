import { Component, OnInit } from '@angular/core';

import { AuthViewService } from '../auth';

@Component({
  selector: 'bio-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.styl']
})
export class ProfilePageComponent implements OnInit {
  auth: AuthViewService;

  constructor(auth: AuthViewService) {
    this.auth = auth;
  }

  ngOnInit() {
  }

}
