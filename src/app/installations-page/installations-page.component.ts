import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import { Observable } from 'rxjs/Rx';

import { RetrieveInstallationParams, InstallationsService } from '../installations';
import { Installation } from '../models';
import { TableFilters, TableManager, TableState } from '../tables';
import { PaginatedResponse } from '../utils/api';

@Component({
  selector: 'bio-installations-page',
  templateUrl: './installations-page.component.html',
  styleUrls: ['./installations-page.component.styl']
})
export class InstallationsPageComponent implements OnInit {
  tableManager: InstallationsTableManager;

  constructor(private installationsService: InstallationsService) {
  }

  ngOnInit() {
    this.tableManager = new InstallationsTableManager(this.installationsService);
  }

}

class InstallationsTableManager extends TableManager<Installation, InstallationsTableFilters> {
  constructor(private installationsService: InstallationsService, private params?: RetrieveInstallationParams) {
    super();
  }

  getInitialState(): TableState<InstallationsTableFilters> {

    const original = super.getInitialState();
    original.sorts = [
      {
        property: 'firstStartedAt',
        direction: 'desc'
      }
    ];

    return original;
  }

  initializeFilters(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      search: [ '' ]
    });
  }

  convertFilters(values: any): InstallationsTableFilters {
    return new InstallationsTableFilters(values);
  }

  retrievePage(state: TableState<InstallationsTableFilters>): Observable<PaginatedResponse<Installation>> {
    return this.installationsService.retrievePaginated(extend({}, this.params, pick(state, 'offset', 'limit', 'sorts'), state.filters));
  }
}

class InstallationsTableFilters implements TableFilters {
  search?: string;

  constructor(values?: any) {
    extend(this, pick(values, 'search'));
  }

  isEmpty(): boolean {
    return !this.search || !this.search.length;
  }
}
