import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BioApiService } from '../api';
import { waitForValidations } from '../forms';
import { PasswordResetRequest } from '../models';
import { passwordConfirmationMustMatch } from '../users';

@Component({
  selector: 'bio-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.styl']
})
export class ResetPasswordPageComponent implements OnInit {
  passwordResetForm: FormGroup;
  passwordResetRequest: PasswordResetRequest;
  passwordResetRequestInvalid: boolean;

  constructor(private api: BioApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
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
      console.log('@@@ reset password');
    });
  }

  private loadPasswordResetRequest(): Observable<PasswordResetRequest> {
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
