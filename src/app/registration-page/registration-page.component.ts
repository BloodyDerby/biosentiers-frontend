import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { BioApiService } from '../api/api.service';
import { BioAuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'bio-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.styl']
})
export class RegistrationPageComponent implements OnInit {

  private invitation: Object;
  private existingUser: User;
  private registrationForm: FormGroup;

  constructor(private api: BioApiService, private auth: BioAuthService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: new FormControl({ value: '', disabled: true }, Validators.required),
      password: [
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
    });

    this.auth.user$.subscribe((user) => {
      this.existingUser = user;
    });

    this.retrieveInvitation().subscribe((invitation) => {
      this.invitation = invitation;
      this.registrationForm.patchValue({
        email: invitation.email,
        firstName: invitation.firstName,
        lastName: invitation.lastName
      });
    });
  }

  invite(event) {
    event.preventDefault();

    if (!this.registrationForm.valid) {
      return;
    }

    this.createUser()
      .switchMap((user) => this.autoLogIn(user))
      .subscribe(() => this.goToHome());
  }

  private retrieveInvitation() {
    return this.api
      .get('/auth/invitation')
      .header('Authorization', 'Bearer ' + this.route.snapshot.queryParams['invitation'])
      .execute()
      .map((res) => res.json());
  }

  private createUser() {
    return this.api
      .post('/users', this.registrationForm.value)
      .header('Authorization', 'Bearer ' + this.route.snapshot.queryParams['invitation'])
      .execute()
      .map((res) => res.json());
  }

  private autoLogIn(user) {
    return this.auth.authenticate({
      email: user.email,
      password: this.registrationForm.value.password
    });
  }

  private goToHome() {
    this.router.navigate([ '/' ]);
  }

}
