import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs/Rx';

import { AuthApiService } from '../auth-api';
import { PasswordResetRequest, User } from '../models';

@Component({
  selector: 'bio-password-reset-link-dialog',
  templateUrl: './password-reset-link-dialog.component.html',
  styleUrls: ['./password-reset-link-dialog.component.styl']
})
export class PasswordResetLinkDialogComponent implements OnInit {
  user: User;
  passwordResetRequest: PasswordResetRequest;

  @ViewChild('modal') modal: ModalDirective;

  private subscription: Subscription;

  constructor(private authApiService: AuthApiService) {
  }

  ngOnInit() {
  }

  onModalShow() {
    this.subscription = this.generatePasswordChangeLink().subscribe(passwordResetRequest => this.passwordResetRequest = passwordResetRequest);
  }

  onModalShown() {
  }

  onModalHide() {
    delete this.user;
    delete this.passwordResetRequest;

    if (this.subscription) {
      this.subscription.unsubscribe();
      delete this.subscription;
    }
  }

  open(user: User) {
    this.user = user;
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  private generatePasswordChangeLink(): Observable<PasswordResetRequest> {
    return this.authApiService.requestPasswordReset(new PasswordResetRequest({ email: this.user.email }));
  }

}

export interface LoginModalUser {
  email?: string;
  password?: string;
}
