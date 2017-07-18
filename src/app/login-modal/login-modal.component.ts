import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { BioAuthService } from '../auth/auth.service';
import { reset } from '../forms';
import { NotificationsService } from '../notifications';

@Component({
  selector: 'bio-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.styl']
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;

  @ViewChild('email') private email: ElementRef;
  @ViewChild('modal') modal: ModalDirective;

  constructor(private authService: BioAuthService, private formBuilder: FormBuilder, private notifications: NotificationsService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.required
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

  onModalShown() {
    this.email.nativeElement.focus();
  }

  open() {
    this.modal.show();
  }

  logIn(event) {
    event.preventDefault();

    if (!this.loginForm.valid) {
      return;
    }

    var credentials = this.loginForm.value;
    this.authService.authenticate(credentials).subscribe(() => {
      reset(this.loginForm, {
        email: '',
        password: ''
      });

      this.close();
    }, err => {
      this.notifications.warning("L'adresse e-mail ou le mot de passe ne sont pas corrects");
    });
  }

  close() {
    this.modal.hide();
  }

}
