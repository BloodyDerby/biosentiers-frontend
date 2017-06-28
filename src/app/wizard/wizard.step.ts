import { NavigationExtras, Router, UrlTree } from '@angular/router';
import isFunction from 'lodash/isFunction';
import { Observable } from 'rxjs/Rx';

import { toObservable } from '../utils/async';
import { CanActivateStep } from './wizard.step.can-activate';
import { StepIsEnabled } from './wizard.step.is-enabled';
import { WizardStepOptions } from './wizard.step.options';

export class WizardStep {

  id: string;
  label: string;
  icon: string;
  options: WizardStepOptions;

  constructor(id: string, label: string, icon: string, options?: WizardStepOptions) {
    this.id = id;
    this.label = label;
    this.icon = icon;
    this.options = options || new WizardStepOptions();
  }

  get route(): any[] {
    return this.options.route;
  }

  get routeExtras(): NavigationExtras {
    return this.options.routeExtras;
  }

  isEnabled(): Observable<boolean> {

    const guards = this.options.isEnabled;
    if (!guards.length) {
      return Observable.of(true);
    }

    const guardObservables = guards.map((guard: StepIsEnabled) => toObservable<boolean>(guard.isEnabled(this)));
    return Observable.from(guardObservables).mergeAll().every((result: boolean) => result);
  }

  canActivate(): Observable<boolean> {

    const guards = this.options.canActivate;
    if (!guards.length) {
      return Observable.of(true);
    }

    const guardObservables = guards.map((guard: CanActivateStep) => toObservable<boolean>(guard.canActivate(this)));
    return Observable.from(guardObservables).mergeAll().every((result: boolean) => result);
  }

  getUrlTree(router: Router): UrlTree {
    return this.options.route ? router.createUrlTree(this.options.route, this.options.routeExtras) : undefined;
  }
}
