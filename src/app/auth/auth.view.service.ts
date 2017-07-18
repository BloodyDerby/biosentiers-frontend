import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';

import { BioAuthService } from './auth.service';
import { User } from '../models';

@Injectable()
export class AuthViewService implements OnDestroy {
  user: User;

  private userSubscription: Subscription;

  constructor(private auth: BioAuthService) {
    this.userSubscription = this.auth.userObs.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  hasRole(role): boolean {
    return this.auth.hasRole(role);
  }
}
