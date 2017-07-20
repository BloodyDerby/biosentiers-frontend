import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { User } from '../models';
import { NotificationsService } from '../notifications';
import { AdminPasswordChange, passwordConfirmationMustMatch, UsersService } from '../users';

@Component({
  selector: 'bio-change-user-password-dialog',
  templateUrl: './change-user-password-dialog.component.html',
  styleUrls: ['./change-user-password-dialog.component.styl']
})
export class ChangeUserPasswordDialogComponent implements OnInit {
  changePasswordForm: FormGroup;
  user: User;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('password') private passwordField: ElementRef;

  constructor(private formBuilder: FormBuilder, private notifications: NotificationsService, private usersService: UsersService) {
  }

  ngOnInit() {
    this.initChangePasswordForm();
  }

  onModalShown() {
    this.passwordField.nativeElement.focus();
  }

  onModalHide() {
    delete this.user;
  }

  open(user: User) {
    this.user = user;
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  changePassword() {

    const change: AdminPasswordChange = {
      id: this.user.id,
      password: this.changePasswordForm.get('password').value
    };

    this.usersService.update(change).subscribe(() => {
      this.notifications.success("Le mot de passe de l'utilisateur a bien été changé");
      this.close();
    }, err => {
      this.notifications.error("Le mot de passe de l'utilisateur n'as pas pu être changé");
    });
  }

  private initChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
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

export interface LoginModalUser {
  email?: string;
  password?: string;
}
