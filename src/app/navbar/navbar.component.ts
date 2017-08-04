import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService, AuthViewService } from '../auth';
import { LoginModalComponent } from '../login-modal';
import { User } from '../models';

@Component({
  selector: 'bio-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})
export class NavbarComponent implements OnInit {
  auth: AuthViewService;

  @ViewChild(LoginModalComponent) loginModal: LoginModalComponent;

  constructor(private authService: AuthService, authViewService: AuthViewService, private route: ActivatedRoute, private router: Router) {
    this.auth = authViewService;
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

  openLoginModal() {
    this.loginModal.open();
  }

  register() {
    this.router.navigate([ '/register' ]);
  }

  logOut() {
    this.authService.unauthenticate();
  }

}
