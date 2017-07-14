import { Component, OnInit, ViewChild } from '@angular/core';
import extend from 'lodash/extend';
import { Observable } from 'rxjs/Rx';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { Excursion } from '../models/excursion';
import { TableManager, TableState } from '../tables/table.manager';
import { PaginatedResponse } from '../utils/api';

@Component({
  selector: 'bio-excursions-page',
  templateUrl: './excursions-page.component.html',
  styleUrls: ['./excursions-page.component.styl']
})
export class ExcursionsPageComponent implements OnInit {
  tableManager: ExcursionsTableManager;

  constructor(private excursionsService: BioExcursionsService) {
  }

  ngOnInit() {
    this.tableManager = new ExcursionsTableManager(this.excursionsService, {
      includeCreator: true
    });
  }
}

class ExcursionsTableManager extends TableManager<Excursion> {
  constructor(private excursionsService: BioExcursionsService, private params?: RetrieveExcursionParams) {
    super();
  }

  getInitialState(): TableState {

    const original = super.getInitialState();
    original.sorts = [
      {
        property: 'createdAt',
        direction: 'desc'
      }
    ];

    return original;
  }

  retrievePage(state: TableState): Observable<PaginatedResponse<Excursion>> {
    return this.excursionsService.retrievePaginated(extend(this.params, state));
  }
}
