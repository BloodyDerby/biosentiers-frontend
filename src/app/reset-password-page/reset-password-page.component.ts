import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api';
import { waitForValidations } from '../forms';
import { PasswordResetRequest, User } from '../models';
import { NotificationsService } from '../notifications';
import { passwordConfirmationMustMatch, UsersService } from '../users';

@Component({
  selector: 'bio-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.styl']
})
export class ResetPasswordPageComponent implements OnInit {
  passwordResetForm: FormGroup;
  passwordResetRequest: PasswordResetRequest;
  passwordResetRequestInvalid: boolean;

  constructor(private api: BioApiService, private formBuilder: FormBuilder, private notifications: NotificationsService, private route: ActivatedRoute, private router: Router, private usersService: UsersService) {
  }

  ngOnInit() {
    this.loadPasswordResetRequest()
      .subscribe(passwordResetRequest => {
        this.passwordResetRequest = passwordResetRequest;
        this.initPasswordResetForm();
      }, err => {
        this.passwordResetRequestInvalid = true;
      });
  }

  resetPassword() {
    waitForValidations(this.passwordResetForm).subscribe(valid => {
      this.performPasswordReset(this.passwordResetForm.get('password').value)
        .subscribe(() => this.goToHome(), err => {
          this.notifications.error(`Votre mot de passe n'a pas pu être changé`);
        });
    });
  }

  private performPasswordReset(password: string): Observable<User> {
    const otp = this.route.snapshot.queryParams.otp;
    return this.usersService.updateMe({
      password: password
    }, otp);
  }

  private goToHome() {
    this.notifications.success('Votre mot de passe a bien été changé');
    this.router.navigate([ '/' ], {
      queryParams: {
        login: this.passwordResetRequest.email
      }
    });
  }

  private loadPasswordResetRequest(): Observable<PasswordResetRequest> {
    // TODO: move to auth service
    return this.api
      .get('/auth/passwordReset')
      .header('Authorization', `Bearer ${this.route.snapshot.queryParams['otp']}`)
      .execute()
      .map(res => new PasswordResetRequest(res.json()));
  }

  private initPasswordResetForm() {
    this.passwordResetForm = this.formBuilder.group({
      password: [
        '',
        Validators.required
      ],
      passwordConfirmation: [
        '',
        Validators.required
      ]
    }, {
      validator: passwordConfirmationMustMatch()
    });
  }

}
