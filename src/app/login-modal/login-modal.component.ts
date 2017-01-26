import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { BioAuthService } from '../auth/auth.service';
import { BioModal } from '../utils/modal/modal';

@Component({
  selector: 'bio-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.styl']
})
export class LoginModalComponent implements BioModal, OnInit {

  @ViewChild('modal') public modal: ModalDirective;

  constructor(private authService: BioAuthService) { }

  ngOnInit() {
  }

  open() {
    this.modal.show();
  }

  onSubmit() {

    var credentials = {
      email: 'foo',
      password: 'bar'
    };

    this.authService.authenticate(credentials).map((res) => res.json()).subscribe(function(authData) {
      console.log(authData);
    });
  }

  close() {
    this.modal.hide();
  }

}
