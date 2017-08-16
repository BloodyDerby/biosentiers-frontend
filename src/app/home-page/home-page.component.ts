import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../auth';
import { ExcursionsService } from '../excursions';
import { User } from '../models';
import { TitleService } from '../title';

@Component({
  selector: 'bio-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.styl']
})
export class HomePageComponent implements OnInit {
  createdExcursionsCount: number;

  constructor(private authService: AuthService, private excursionsService: ExcursionsService, private titleService: TitleService) {
  }

  ngOnInit() {

    this.titleService.setTitle([]);

    this.authService.userObs
      .filter(user => !!user)
      .first()
      .switchMap(user => this.checkExcursions(user))
      .subscribe(count => this.createdExcursionsCount = count);
  }

  private checkExcursions(user: User): Observable<number> {
    return this.excursionsService.count({
      creators: [ user.id ]
    }).map(res => res.pagination.effectiveTotal);
  }

}
