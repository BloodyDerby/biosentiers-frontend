import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import extend from 'lodash/extend';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import some from 'lodash/some';
import { Observable } from 'rxjs/Rx';

import { hasError } from '../api';
import { BioAuthService } from '../auth/auth.service';
import { AuthViewService } from '../auth/auth.view.service';
import { reset, waitForValidations } from '../forms';
import { User } from '../models';
import { NotificationsService } from '../notifications';
import { IdentifiedUserPasswordChange, passwordConfirmationMustMatch, UsersService } from '../users';

const PASSWORD_FORM_FIELDS = [ 'oldPassword', 'password', 'passwordConfirmation' ];

@Component({
  selector: 'bio-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.styl']
})
export class ProfileEditPageComponent implements OnInit {
  profileForm: FormGroup;
  passwordChangeForm: FormGroup;

  constructor(private authService: BioAuthService, private formBuilder: FormBuilder, private notifications: NotificationsService, private usersService: UsersService) {
  }

  ngOnInit() {
    this.authService.userObs
      .first()
      .subscribe((user: User) => {
        this.initProfileForm(user);
        this.initPasswordChangeForm();
      });
  }

  saveProfile() {
    waitForValidations(this.profileForm).subscribe(valid => {
      if (!valid) {
        return;
      }

      const values = this.profileForm.value;

      this.authService.userObs
        .first()
        .switchMap((user: User) => {

          const update = new User(extend({
            id: user.id,
          }, values));

          return this.usersService.update(update);
        }).subscribe((user: User) => {
          this.authService.updateUser(user, true);
          this.notifications.success('Votre profil a bien été mis à jour');
        }, err => {
          this.notifications.error("Votre profil n'a pas pu être mis à jour");
        });
    });
  }

  profileHasChanged(): Observable<boolean> {
    return this.authService.userObs
      .filter(user => !!user)
      .first()
      .map((user: User) => !isEqual(this.profileForm.value, pick(user, 'firstName', 'lastName')));
  }

  resetProfile() {
    this.authService.userObs
      .first()
      .subscribe((user: User) => {
        this.profileForm.setValue(pick(user, 'firstName', 'lastName'));
      });
  }

  changePassword() {
    waitForValidations(this.passwordChangeForm).subscribe(valid => {
      if (!valid) {
        return;
      }

      const oldPassword = this.passwordChangeForm.get('oldPassword').value;
      const newPassword = this.passwordChangeForm.get('password').value;

      this.authService.userObs
        .first()
        .switchMap((user: User) => {

          const update: IdentifiedUserPasswordChange = {
            id: user.id,
            password: newPassword,
            previousPassword: oldPassword
          };

          return this.usersService.update(update);
        }).subscribe((user: User) => {
          this.authService.updateUser(user, true);
          this.notifications.success('Votre mot de passe a bien été changé');
          this.resetPasswordChange();
        }, err => {

          const previousPasswordIncorrectError = {
            location: '/previousPassword',
            validator: 'user.previousPassword'
          };

          if (hasError(err, previousPasswordIncorrectError)) {
            this.notifications.warning("Le mot de passe actuel n'est pas le bon");
          } else {
            this.notifications.error("Votre mot de passe n'a pas pu être changé");
          }
        });
    });
  }

  passwordIsBeingChanged() {
    return some(PASSWORD_FORM_FIELDS, name => this.passwordChangeForm.get(name).value.length);
  }

  resetPasswordChange() {
    reset(this.passwordChangeForm, {
      oldPassword: '',
      password: '',
      passwordConfirmation: ''
    });
  }

  initProfileForm(user: User) {
    this.profileForm = this.formBuilder.group({
      firstName: [
        user.firstName,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20)
        ])
      ],
      lastName: [
        user.lastName,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20)
        ])
      ]
    });
  }

  initPasswordChangeForm() {
    this.passwordChangeForm = this.formBuilder.group({
      oldPassword: [
        '',
        Validators.required
      ],
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
