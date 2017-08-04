import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import every from 'lodash/every';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './auth.service';
import { getRouteRequiredRoles } from './auth.utils';

@Injectable()
export class CanAccessPage implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    const requiredRoles = getRouteRequiredRoles(route);
    if (!requiredRoles.length) {
      return true;
    }

    return this.auth.userObs.first().map(user => {

      const authorized = user && every(requiredRoles, role => user.hasRole(role));
      if (!authorized) {
        this.router.navigate([ '' ]);
      }

      return authorized;
    });
  }
}
