import { Component, OnInit, ViewChild } from '@angular/core';

import { BioExcursionsService } from '../excursions/excursions.service';

@Component({
  selector: 'bio-excursions-new-page',
  templateUrl: './excursions-new-page.component.html',
  styleUrls: ['./excursions-new-page.component.styl']
})
export class NewExcursionPageComponent implements OnInit {

  private excursions;

  constructor(private excursionsService: BioExcursionsService) {
  }

  ngOnInit() {
  }

}
