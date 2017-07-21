import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BioAuthService } from '../auth/auth.service';
import { User } from '../models';
import { UsersService } from '../users';

@Component({
  selector: 'bio-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.styl']
})
export class EditUserPageComponent implements OnInit {
  user: User;

  constructor(private authService: BioAuthService, private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit() {
    this.loadUser().subscribe(user => this.user = user);
  }

  onUserUpdated(updatedUser: User) {
    this.user = updatedUser;
  }

  private loadUser(): Observable<User> {
    const id = this.route.snapshot.params.id;
    return this.usersService.retrieve(id);
  }

}
