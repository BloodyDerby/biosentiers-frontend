import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BioAuthService } from './auth.service';
import { User } from '../models';

@Injectable()
export class AuthViewService {
  constructor(private auth: BioAuthService) {
  }

  hasRole(role): boolean {
    return this.auth.hasRole(role);
  }
}
