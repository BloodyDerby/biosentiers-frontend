import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioAuthService } from './auth.service';

@Injectable()
export class CanAccessPage implements CanActivate {

  constructor(private auth: BioAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    const requiredRole = route.data['requiredRole'];
    if (!requiredRole) {
      return true;
    }

    return this.auth.userObs.take(1).map((user) => {

      const authorized = user && user.hasRole(requiredRole);
      if (!authorized) {
        this.router.navigate([ 'home' ]);
      }

      return authorized;
    });
  }
}
