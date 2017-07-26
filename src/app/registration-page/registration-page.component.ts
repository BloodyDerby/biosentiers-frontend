import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { BioAuthService, AuthApiService, AuthViewService } from '../auth';
import { waitForValidations } from '../forms';
import { Invitation, User } from '../models';
import { NotificationsService } from '../notifications';
import { passwordConfirmationMustMatch, UsersService } from '../users';

@Component({
  selector: 'bio-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.styl']
})
export class RegistrationPageComponent implements OnInit {

  auth: AuthViewService;
  invitationInvalid: boolean;
  registrationForm: FormGroup;

  constructor(private authService: BioAuthService, private authApiService: AuthApiService, authViewService: AuthViewService, private formBuilder: FormBuilder, private notifications: NotificationsService, private route: ActivatedRoute, private router: Router, private usersService: UsersService) {
    this.auth = authViewService;
  }

  ngOnInit() {
    this.retrieveInvitation().subscribe(invitation => {
      this.initRegistrationForm();
      this.registrationForm.patchValue({
        email: invitation.email,
        firstName: invitation.firstName,
        lastName: invitation.lastName
      });
    }, err => {
      this.invitationInvalid = true;
    });
  }

  invite() {
    waitForValidations(this.registrationForm).subscribe(valid => {
      if (!this.registrationForm.valid) {
        return;
      }

      this.createUser()
        .switchMap(user => this.autoLogIn(user))
        .subscribe(() => {
          this.notifications.success('Bienvenue sur le site BioSentiers !');
          this.goToHome();
        }, err => {
          this.notifications.error("Votre compte n'a pas pu être créé");
        });
    })
  }

  private initRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      email: new FormControl({ value: '', disabled: true }, Validators.required),
      password: [
        '',
        Validators.required
      ],
      passwordConfirmation: [
        '',
        Validators.required
      ],
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20)
        ])
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20)
        ])
      ]
    }, {
      validator: passwordConfirmationMustMatch()
    });
  }

  private retrieveInvitation(): Observable<Invitation> {
    return this.authApiService.retrieveInvitation(this.route.snapshot.queryParams.invitation);
  }

  private createUser(): Observable<User> {
    return this.usersService.create(this.registrationForm.value, this.route.snapshot.queryParams.invitation);
  }

  private autoLogIn(user) {
    return this.authService.authenticate({
      email: user.email,
      password: this.registrationForm.get('password').value
    });
  }

  private goToHome() {
    this.router.navigate([ '/' ]);
  }

}
