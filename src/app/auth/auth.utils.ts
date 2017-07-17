import { ActivatedRouteSnapshot } from '@angular/router';

export function getRouteRequiredRoles(route: ActivatedRouteSnapshot, roles: string[] = []) {

  const requiredRole = route.data.requiredRole;
  if (requiredRole) {
    roles.push(requiredRole);
  }

  route.children.forEach(childRoute => getRouteRequiredRoles(childRoute, roles));

  return roles;
};
