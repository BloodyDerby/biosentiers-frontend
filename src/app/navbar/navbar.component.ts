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

  private user: User;
  @ViewChild(LoginModalComponent) loginModal: LoginModalComponent;

  constructor(private auth: BioAuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    })
  }

  openLoginModal() {
    this.loginModal.open();
  }

  logOut() {
    this.auth.unauthenticate();
  }

}
