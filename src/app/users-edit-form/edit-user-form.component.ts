import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import extend from 'lodash/extend';
import isEqual from 'lodash/isEqual';
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import reduce from 'lodash/reduce';
import some from 'lodash/some';
import { Observable } from 'rxjs/Rx';

import { hasError } from '../api';
import { AuthService } from '../auth';
import { AuthViewService } from '../auth/auth.view.service';
import { reset, waitForValidations } from '../forms';
import { roles, User } from '../models';
import { NotificationsService } from '../notifications';
import { AdminPasswordChange, IdentifiedUserPasswordChange, passwordConfirmationMustMatch, UsersService } from '../users';

@Component({
  selector: 'bio-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.styl']
})
export class EditUserFormComponent implements OnInit {
  admin: boolean;
  auth: AuthViewService;
  profileForm: FormGroup;
  profileFormFields: string[];
  passwordChangeForm: FormGroup;
  passwordChangeFormFields: string[];
  userRoleChoices: Array<{ [s: string]: string; }>;

  @Input()
  user: User;

  @Input()
  profile: boolean;

  @Output()
  onUserUpdated: EventEmitter<User>;

  constructor(private authService: AuthService, authViewService: AuthViewService, private formBuilder: FormBuilder, private notifications: NotificationsService, private usersService: UsersService) {
    this.auth = authViewService;
    this.onUserUpdated = new EventEmitter<User>();

    this.userRoleChoices = reduce(roles, (memo, role) => {
      memo.push({
        value: role,
        label: role
      });

      return memo;
    }, []);
  }

  ngOnInit() {
    this.authService.userObs.first().subscribe(currentUser => {
      this.admin = currentUser.hasRole('admin');
      this.initProfileForm(this.user);
      this.initPasswordChangeForm();
    });
  }

  saveProfile() {
    waitForValidations(this.profileForm).subscribe(valid => {
      if (!valid) {
        return;
      }

      const values = this.profileForm.value;

      const update = new User(extend({
        id: this.user.id,
      }, values));

      return this.usersService.update(update).subscribe((updatedUser: User) => {
        this.onUserUpdated.emit(updatedUser);
        this.updateAuthenticatedUser(updatedUser);
        this.notifications.success(this.profile ? 'Votre profil a bien été mis à jour' : "Le profil de l'utilisateur a bien été mis à jour");
      }, err => {
        this.notifications.error(this.profile ? "Votre profil n'a pas pu être mis à jour" : "Le profile de l'utilisateur n'a pas pu être mis à jour");
      });
    });
  }

  profileHasChanged(): boolean {
    return !isEqual(this.profileForm.value, pick(this.user, this.profileFormFields));
  }

  resetProfile() {
    this.profileForm.setValue(pick(this.user, this.profileFormFields));
  }

  changePassword() {
    waitForValidations(this.passwordChangeForm).subscribe(valid => {
      if (!valid) {
        return;
      }

      let update: IdentifiedUserPasswordChange | AdminPasswordChange;
      const newPassword = this.passwordChangeForm.get('password').value;

      if (this.admin) {
        update = {
          id: this.user.id,
          password: newPassword
        };
      } else {
        update = {
          id: this.user.id,
          password: newPassword,
          previousPassword: this.passwordChangeForm.get('oldPassword').value
        };
      }

      return this.usersService.update(update).subscribe((updatedUser: User) => {
        this.onUserUpdated.emit(updatedUser);
        this.updateAuthenticatedUser(updatedUser);
        this.notifications.success(this.profile ? 'Votre mot de passe a bien été changé' : "Le mot de passe de l'utilisateur a bien été changé");
        this.resetPasswordChange();
      }, err => {

        const previousPasswordIncorrectError = {
          location: '/previousPassword',
          validator: 'user.previousPassword'
        };

        if (hasError(err, previousPasswordIncorrectError)) {
          this.notifications.warning("Le mot de passe actuel n'est pas le bon");
        } else {
          this.notifications.error(this.profile ? "Votre mot de passe n'a pas pu être changé" : "Le mot de passe de l'utilisateur n'a pas pu être changé");
        }
      });
    });
  }

  passwordIsBeingChanged() {
    return some(this.passwordChangeFormFields, name => this.passwordChangeForm.get(name).value.length);
  }

  resetPasswordChange() {
    reset(this.passwordChangeForm, reduce(this.passwordChangeFormFields, (memo, name) => {
      memo[name] = '';
      return memo;
    }, {}));
  }

  private initProfileForm(user: User) {

    const fields = {
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
    };

    if (!this.profile && this.admin) {
      extend(fields, {
        active: [
          user.active,
          Validators.required
        ],
        role: [
          user.role,
          Validators.required
        ]
      });
    }

    this.profileForm = this.formBuilder.group(fields);
    this.profileFormFields = keys(fields);
  }

  private initPasswordChangeForm() {

    const fields = {
      password: [
        '',
        Validators.required
      ],
      passwordConfirmation: [
        '',
        Validators.required
      ]
    };

    if (this.profile || !this.admin) {
      extend(fields, {
        oldPassword: [
          '',
          Validators.required
        ]
      });
    }

    this.passwordChangeForm = this.formBuilder.group(fields, {
      validator: passwordConfirmationMustMatch()
    });

    this.passwordChangeFormFields = keys(fields);
  }

  private updateAuthenticatedUser(updatedUser: User) {
    this.authService.userObs.first().subscribe(user => {
      if (user && user.id === updatedUser.id) {
        this.authService.updateUser(updatedUser, true);
      }
    })
  }

}
