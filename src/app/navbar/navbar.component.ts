import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BioAuthService, AuthViewService } from '../auth';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { User } from '../models/user';

@Component({
  selector: 'bio-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})
export class NavbarComponent implements OnInit {
  auth: AuthViewService;

  @ViewChild(LoginModalComponent) loginModal: LoginModalComponent;

  constructor(auth: AuthViewService, private authService: BioAuthService, private route: ActivatedRoute) {
    this.auth = auth;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.login !== undefined) {
        this.loginModal.open({
          email: params.login
        });
      }
    });
  }

  openLoginModal(event) {
    event.preventDefault();
    this.loginModal.open();
  }

  logOut(event) {
    event.preventDefault();
    this.authService.unauthenticate();
  }

}
