import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import { Observable } from 'rxjs/Rx';

import { ApiQueryParams, PaginatedResponse, tableStateToApiQueryParams } from '../api';
import { RetrieveInstallationParams, InstallationsService } from '../installations';
import { Installation } from '../models';
import { TableFilters, TableManager, TableState } from '../tables';
import { TitleService } from '../title';

@Component({
  selector: 'bio-installations-page',
  templateUrl: './installations-page.component.html',
  styleUrls: ['./installations-page.component.styl']
})
export class InstallationsPageComponent implements OnInit {
  tableManager: InstallationsTableManager;

  constructor(private installationsService: InstallationsService, private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.setTitle([ 'Installations' ]);
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
    return this.installationsService.retrievePaginated(extend({}, this.params, tableStateToApiQueryParams(state)));
  }
}

class InstallationsTableFilters implements ApiQueryParams, TableFilters {
  search?: string;

  constructor(values?: any) {
    extend(this, pick(values, 'search'));
  }

  isEmpty(): boolean {
    return !this.search || !this.search.length;
  }

  toParams() {
    return pick(this, 'search');
  }
}
