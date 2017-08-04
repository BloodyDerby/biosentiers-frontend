import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { AuthService, AuthViewService } from '../auth';
import { AuthApiService } from '../auth-api';
import { waitForValidations } from '../forms';
import { Invitation, User } from '../models';
import { NotificationsService } from '../notifications';
import { UserValidationsService } from '../users';

@Component({
  selector: 'bio-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.styl']
})
export class RegistrationPageComponent implements OnInit {
  auth: AuthViewService;
  invitation: Invitation;
  registered: boolean;
  registrationForm: FormGroup;

  constructor(private authService: AuthService, private authApiService: AuthApiService, authViewService: AuthViewService, private formBuilder: FormBuilder, private notifications: NotificationsService, private router: Router, private userValidationsService: UserValidationsService) {
    this.auth = authViewService;
  }

  ngOnInit() {
    this.initRegistrationForm();
  }

  invite() {
    waitForValidations(this.registrationForm).subscribe(valid => {
      if (!this.registrationForm.valid) {
        return;
      }

      const invitation = new Invitation(this.registrationForm.value);
      invitation.sent = true;

      this.authApiService.sendInvitation(invitation).subscribe(createdInvitation => {
        this.invitation = createdInvitation;
      }, err => {
        this.notifications.error("Votre demande d'inscription n'a pas pu être prise en compte. Veuillez réessayer plus tard.");
      });
    });
  }

  private initRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ]),
        this.userValidationsService.emailAvailable()
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
    });
  }

}
