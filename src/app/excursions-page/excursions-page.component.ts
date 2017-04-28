import { Component, OnInit, ViewChild } from '@angular/core';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { Excursion } from '../models/excursion';

@Component({
  selector: 'bio-excursions-page',
  templateUrl: './excursions-page.component.html',
  styleUrls: ['./excursions-page.component.styl']
})
export class ExcursionsPageComponent implements OnInit {

  private excursions: Excursion[];

  constructor(private excursionsService: BioExcursionsService) {
  }

  ngOnInit() {
    const params: RetrieveExcursionParams = {
      includeCreator: true
    };

    this.excursionsService.retrieveAll(params).subscribe(excursions => {
      this.excursions = excursions;
    });
  }

}
