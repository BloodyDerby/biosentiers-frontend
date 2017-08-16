import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AuthService, AuthViewService } from '../auth';
import { AuthApiService } from '../auth-api';
import { waitForValidations } from '../forms';
import { Invitation, User } from '../models';
import { NotificationsService } from '../notifications';
import { TitleService } from '../title';
import { passwordConfirmationMustMatch, UsersService } from '../users';

@Component({
  selector: 'bio-complete-registration-page',
  templateUrl: './complete-registration-page.component.html',
  styleUrls: ['./complete-registration-page.component.styl']
})
export class CompleteRegistrationPageComponent implements OnInit {
  auth: AuthViewService;
  invitationInvalid: boolean;
  registrationForm: FormGroup;

  @ViewChild('password')
  private passwordField: ElementRef;
  private passwordFieldFocused: boolean;

  constructor(private authService: AuthService, private authApiService: AuthApiService, authViewService: AuthViewService, private formBuilder: FormBuilder, private notifications: NotificationsService, private route: ActivatedRoute, private router: Router, private titleService: TitleService, private usersService: UsersService) {
    this.auth = authViewService;
  }

  ngOnInit() {
    this.titleService.setTitle([ 'Inscription' ]);

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

  ngDoCheck() {
    if (this.passwordField && !this.passwordFieldFocused) {
      this.passwordFieldFocused = true;
      this.passwordField.nativeElement.focus();
    }
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
