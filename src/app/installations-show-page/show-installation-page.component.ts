import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import { Observable } from 'rxjs/Rx';

import { InstallationsService } from '../installations';
import { RetrieveInstallationEventParams, InstallationEventsService } from '../installation-events';
import { Installation, InstallationEvent } from '../models';
import { TableFilters, TableManager, TableState } from '../tables';
import { PaginatedResponse } from '../utils/api';
import { parsePropertiesInto } from '../utils/models';

@Component({
  selector: 'bio-show-installation-page',
  templateUrl: './show-installation-page.component.html',
  styleUrls: ['./show-installation-page.component.styl']
})
export class ShowInstallationPageComponent implements OnInit {
  installation: Installation;
  tableManager: InstallationEventsTableManager;
  initError: Error;

  constructor(private installationsService: InstallationsService, private installationEventsService: InstallationEventsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initInstallation()
      .do(() => this.initTable())
      .subscribe(undefined, err => this.initError = err);
  }

  private initInstallation(): Observable<Installation> {
    const id = this.route.snapshot.params.id;
    return this.installationsService.retrieve(id).do(installation => this.installation = installation);
  }

  private initTable() {
    this.tableManager = new InstallationEventsTableManager(this.installation, this.installationEventsService);
  }

}

class InstallationEventsTableManager extends TableManager<InstallationEvent, InstallationEventsTableFilters> {
  constructor(private installation: Installation, private installationEventsService: InstallationEventsService, private params?: RetrieveInstallationEventParams) {
    super();
  }

  getInitialState(): TableState<InstallationEventsTableFilters> {

    const original = super.getInitialState();
    original.sorts = [
      {
        property: 'occurredAt',
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

  convertFilters(values: any): InstallationEventsTableFilters {
    return new InstallationEventsTableFilters(values);
  }

  retrievePage(state: TableState<InstallationEventsTableFilters>): Observable<PaginatedResponse<InstallationEvent>> {
    return this.installationEventsService.retrievePaginated(this.installation, extend({}, this.params, pick(state, 'offset', 'limit', 'sorts'), state.filters));
  }
}

class InstallationEventsTableFilters implements TableFilters {
  //search?: string;

  constructor(values?: any) {
    parsePropertiesInto(this, values/*, 'search'*/);
  }

  isEmpty(): boolean {
    //return !this.search || !this.search.length;
    return true;
  }
}
