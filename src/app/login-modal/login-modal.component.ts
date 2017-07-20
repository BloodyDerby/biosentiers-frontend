import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import omit from 'lodash/omit';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { BioAuthService, AuthApiService } from '../auth';
import { reset, waitForValidations } from '../forms';
import { PasswordResetRequest } from '../models';
import { NotificationsService } from '../notifications';

@Component({
  selector: 'bio-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.styl']
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  forgottenPassword: boolean;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('email') private emailField: ElementRef;
  @ViewChild('password') private passwordField: ElementRef;

  constructor(private authService: BioAuthService, private authApiService: AuthApiService, private formBuilder: FormBuilder, private notifications: NotificationsService, private router: Router) { }

  ngOnInit() {
    this.initLoginForm();
  }

  onModalShown() {
    if (!this.loginForm.get("email").value) {
      this.emailField.nativeElement.focus();
    } else {
      this.passwordField.nativeElement.focus();
    }
  }

  onModalHide() {

    const currentRoute: ActivatedRoute = this.router.routerState.root;
    const currentQueryParams: Params = currentRoute.snapshot.queryParams;

    // Remove the "login" query param
    this.router.navigate([], {
      relativeTo: currentRoute,
      queryParams: omit(currentQueryParams, 'login')
    });
  }

  open(user?: LoginModalUser) {
    this.forgottenPassword = false;
    if (user) {
      this.loginForm.patchValue(user);
    }

    this.modal.show();
  }

  logIn() {
    if (this.forgottenPassword) {
      return this.requestPasswordReset();
    }

    waitForValidations(this.loginForm).subscribe(valid => {
      if (!valid) {
        return;
      }

      const credentials = this.loginForm.value;
      this.authService.authenticate(credentials).subscribe(() => {
        reset(this.loginForm, {
          email: '',
          password: ''
        });

        this.close();
      }, err => {
        this.notifications.warning("L'adresse e-mail ou le mot de passe ne sont pas corrects");
      });
    });
  }

  forgotPassword() {
    this.forgottenPassword = true;
  }

  requestPasswordReset() {

    const emailControl = this.loginForm.get("email");
    const email = emailControl.value;

    waitForValidations(emailControl).subscribe(valid => {

      const passwordResetRequest = new PasswordResetRequest({
        email: email
      });

      this.authApiService.requestPasswordReset(passwordResetRequest).subscribe(() => {
        this.notifications.success(`E-mail de changement de mot de passe envoyé à ${email}`);
        this.close();
      }, err => {
        this.notifications.error("Votre demande n'a pas pu être prise en compte");
      });
    });
  }

  close() {
    this.modal.hide();
  }

  private initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

}

export interface LoginModalUser {
  email?: string;
  password?: string;
}
