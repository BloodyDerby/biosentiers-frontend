import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { BioAuthService } from '../auth/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { User } from '../models/user';

@Component({
  selector: 'bio-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})
export class NavbarComponent implements OnInit {

  user: User;

  @ViewChild(LoginModalComponent) loginModal: LoginModalComponent;

  constructor(private auth: BioAuthService) { }

  ngOnInit() {
    this.auth.userObs.subscribe((user) => {
      this.user = user;
    })
  }

  openLoginModal(event) {
    event.preventDefault();
    this.loginModal.open();
  }

  logOut(event) {
    event.preventDefault();
    this.auth.unauthenticate();
  }

}
