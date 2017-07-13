import { Component, OnInit, ViewChild } from '@angular/core';
import extend from 'lodash/extend';
import { Observable } from 'rxjs/Rx';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { Excursion } from '../models/excursion';
import { TableConfig } from '../tables/table.config';
import { PaginatedResponse } from '../utils/api';

@Component({
  selector: 'bio-excursions-page',
  templateUrl: './excursions-page.component.html',
  styleUrls: ['./excursions-page.component.styl']
})
export class ExcursionsPageComponent implements OnInit {
  excursionsTableConfig: ExcursionsTableConfig;

  constructor(private excursionsService: BioExcursionsService) {
  }

  ngOnInit() {
    this.excursionsTableConfig = new ExcursionsTableConfig(this.excursionsService, {
      includeCreator: true
    });
  }
}

class ExcursionsTableConfig extends TableConfig<Excursion> {
  constructor(private excursionsService: BioExcursionsService, private params?: RetrieveExcursionParams) {
    super();
  }

  retrievePage(offset: number, limit: number): Observable<PaginatedResponse<Excursion>> {
    return this.excursionsService.retrievePaginated(extend(this.params, {
      offset: offset,
      limit: limit
    }));
  }
}
