import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions';
import { Excursion } from '../models';

@Component({
  selector: 'bio-show-excursion-page',
  templateUrl: './show-excursion-page.component.html',
  styleUrls: ['./show-excursion-page.component.styl']
})
export class ShowExcursionPageComponent implements OnInit {
  excursion: Excursion;

  constructor(private excursionsService: BioExcursionsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadExcursion().subscribe(excursion => {
      this.excursion = excursion;
    });
  }

  private loadExcursion(): Observable<Excursion> {
    const id = this.route.snapshot.params.id;
    return this.excursionsService.retrieve(id, retrieveExcursionParams);
  }
}

const retrieveExcursionParams: RetrieveExcursionParams = {
  includeCreator: true,
  includeTrail: true
};
