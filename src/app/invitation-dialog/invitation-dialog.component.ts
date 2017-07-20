import reduce from 'lodash/reduce';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AuthApiService } from '../auth';
import { waitForValidations } from '../forms';
import { Invitation, roles } from '../models';
import { NotificationsService } from '../notifications';

@Component({
  selector: 'bio-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.styl']
})
export class InvitationDialogComponent implements OnInit {

  invitationForm: FormGroup;
  userRoleChoices: Array<{ [s: string]: string; }>;

  @ViewChild('email') private email: ElementRef;
  @ViewChild('modal') private modal: ModalDirective;

  constructor(private authApi: AuthApiService, private formBuilder: FormBuilder, private notifications: NotificationsService) {
  }

  ngOnInit() {
    this.invitationForm = this.formBuilder.group({
      email: [
        '',
        Validators.required
      ],
      role: [
        roles[0],
        Validators.required
      ],
      firstName: [
        '',
        Validators.maxLength(20)
      ],
      lastName: [
        '',
        Validators.maxLength(20)
      ]
    });

    this.userRoleChoices = reduce(roles, (memo, role) => {
      memo.push({
        value: role,
        label: role
      });

      return memo;
    }, []);
  }

  onModalShown() {
    this.email.nativeElement.focus();
  }

  open() {
    this.modal.show();
  }

  invite() {
    waitForValidations(this.invitationForm).subscribe(valid => {
      if (!this.invitationForm.valid) {
        return;
      }

      const invitation = new Invitation(this.invitationForm.value);

      return this.authApi
        .sendInvitation(invitation)
        .subscribe(() => {
          this.notifications.success('Votre invitation a bien été envoyée');
          this.close();
        }, err => {
          this.notifications.error("Votre invitation n'as pas pu être envoyée");
        });
    });
  }

  close() {
    this.modal.hide();
  }

}
