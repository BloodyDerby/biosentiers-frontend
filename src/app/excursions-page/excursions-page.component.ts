import { Component, OnInit, ViewChild } from '@angular/core';

import { BioExcursionsService } from '../excursions/excursions.service';

@Component({
  selector: 'bio-excursions-page',
  templateUrl: './excursions-page.component.html',
  styleUrls: ['./excursions-page.component.styl']
})
export class ExcursionsPageComponent implements OnInit {

  private excursions;

  constructor(private excursionsService: BioExcursionsService) {
  }

  ngOnInit() {
    this.excursionsService.retrieveAll().subscribe(excursions => {
      this.excursions = excursions;
    });
  }

}
