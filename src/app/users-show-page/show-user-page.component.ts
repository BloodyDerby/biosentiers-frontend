import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { PasswordResetLinkDialogComponent } from './';
import { User } from '../models';
import { NotificationsService } from '../notifications';
import { UserActivation, UsersService } from '../users';

@Component({
  selector: 'bio-show-user-page',
  templateUrl: './show-user-page.component.html',
  styleUrls: ['./show-user-page.component.styl']
})
export class ShowUserPageComponent implements OnInit {
  user: User;

  @ViewChild(PasswordResetLinkDialogComponent)
  passwordResetLinkDialog: PasswordResetLinkDialogComponent;

  constructor(private notifications: NotificationsService, private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit() {
    this.loadUser().subscribe(user => this.user = user);
  }

  openPasswordResetLinkDialog() {
    this.passwordResetLinkDialog.open(this.user);
  }

  setUserActive(active: boolean) {

    const activation: UserActivation = {
      id: this.user.id,
      active: active
    };

    this.usersService.update(activation).subscribe(user => {
      this.user = user;
      this.notifications.success(`L'utilisateur ${this.user.fullName} a bien été ${active ? "activé": "désactivé"}`);
    }, err => {
      this.notifications.error("Le status de l'utilisateur n'as pas pu être changé");
    });
  }

  private loadUser(): Observable<User> {
    const id = this.route.snapshot.params.id;
    return this.usersService.retrieve(id);
  }

}
