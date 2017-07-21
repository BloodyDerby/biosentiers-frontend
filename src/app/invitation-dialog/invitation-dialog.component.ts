import reduce from 'lodash/reduce';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AuthApiService } from '../auth';
import { waitForValidations } from '../forms';
import { Invitation, roles } from '../models';
import { NotificationsService } from '../notifications';
import { UserValidationsService } from '../users';

@Component({
  selector: 'bio-invitation-dialog',
  templateUrl: './invitation-dialog.component.html',
  styleUrls: ['./invitation-dialog.component.styl']
})
export class InvitationDialogComponent implements OnInit {
  invitation: Invitation;
  invitationForm: FormGroup;
  userRoleChoices: Array<{ [s: string]: string; }>;

  @ViewChild('email') private email: ElementRef;
  @ViewChild('modal') private modal: ModalDirective;

  constructor(private authApi: AuthApiService, private formBuilder: FormBuilder, private notifications: NotificationsService, private userValidationsService: UserValidationsService) {
    this.userRoleChoices = reduce(roles, (memo, role) => {
      memo.push({
        value: role,
        label: role
      });

      return memo;
    }, []);
  }

  ngOnInit() {
    this.initInvitationForm();
  }

  onModalShown() {
    this.email.nativeElement.focus();
  }

  onModalHidden() {
    delete this.invitation;
    this.resetInvitationForm();
  }

  open() {
    this.modal.show();
  }

  invite(send: boolean) {
    waitForValidations(this.invitationForm).subscribe(valid => {
      if (!this.invitationForm.valid) {
        return;
      }

      const invitation = new Invitation(this.invitationForm.value);
      invitation.sent = send;

      return this.authApi
        .sendInvitation(invitation)
        .subscribe(createdInvitation => {
          if (send) {
            this.notifications.success('Votre invitation a bien été envoyée');
            this.close();
          } else {
            this.invitation = createdInvitation;
          }
        }, err => {
          this.notifications.error(send ? "Votre invitation n'as pas pu être envoyée" : "Le lien d'invitation n'as pas pu être généré");
        });
    });
  }

  close() {
    this.modal.hide();
  }

  private resetInvitationForm() {
    this.invitationForm.patchValue({
      email: '',
      role: roles[0],
      firstName: '',
      lastName: ''
    });
  }

  private initInvitationForm() {
    this.invitationForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ]),
        this.userValidationsService.emailAvailable()
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
  }

}
