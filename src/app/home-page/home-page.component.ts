import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { BioAuthService } from '../auth';
import { BioExcursionsService } from '../excursions';
import { User } from '../models';

@Component({
  selector: 'bio-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.styl']
})
export class HomePageComponent implements OnInit {
  createdExcursionsCount: number;

  constructor(private authService: BioAuthService, private excursionsService: BioExcursionsService) {
  }

  ngOnInit() {
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
