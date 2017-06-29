import { NavigationExtras, Router, UrlTree } from '@angular/router';

export class WizardStepRoute {
  url: string | UrlTree | any[];
  navigationExtras: NavigationExtras;

  constructor(url: string | UrlTree | any[], navigationExtras?: NavigationExtras) {
    this.url = url;
    this.navigationExtras = navigationExtras;
  }

  navigate(router: Router): Promise<boolean> {
    if (typeof(this.url) == 'string' || this.url instanceof UrlTree) {
      return router.navigateByUrl(this.url, this.navigationExtras);
    } else {
      return router.navigate(this.url, this.navigationExtras);
    }
  }

  getUrlTree(router: Router): UrlTree {
    if (this.url instanceof UrlTree) {
      return this.url;
    } else if (typeof(this.url) == 'string') {
      return router.parseUrl(this.url);
    } else {
      return router.createUrlTree(this.url, this.navigationExtras);
    }
  }
}
