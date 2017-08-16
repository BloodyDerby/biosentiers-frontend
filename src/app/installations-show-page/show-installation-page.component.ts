import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import { Observable } from 'rxjs/Rx';

import { ApiQueryParams, PaginatedResponse, tableStateToApiQueryParams } from '../api';
import { InstallationsService } from '../installations';
import { RetrieveInstallationEventParams, InstallationEventsService } from '../installation-events';
import { ShowInstallationEventDialogComponent } from '../installation-events-show-dialog';
import { Installation, InstallationEvent } from '../models';
import { TableFilters, TableManager, TableState } from '../tables';
import { TitleService } from '../title';

@Component({
  selector: 'bio-show-installation-page',
  templateUrl: './show-installation-page.component.html',
  styleUrls: ['./show-installation-page.component.styl']
})
export class ShowInstallationPageComponent implements OnInit {
  installation: Installation;
  tableManager: InstallationEventsTableManager;
  initError: Error;

  @ViewChild(ShowInstallationEventDialogComponent) showInstallationEventDialog: ShowInstallationEventDialogComponent;

  constructor(private installationsService: InstallationsService, private installationEventsService: InstallationEventsService, private route: ActivatedRoute, private router: Router, private titleService: TitleService) {
  }

  ngOnInit() {

    const installationObs = this.initInstallation();
    this.titleService.setTitle(installationObs.first().map(installation => [ 'Installations', installation.id ]));

    installationObs
      .switchMap(() => {
        this.initTable();
        return this.initEventDialog();
      })
      .subscribe(undefined, err => this.initError = err);
  }

  showEvent(installationEvent: InstallationEvent) {
    this.showInstallationEventDialog.open(this.installation, installationEvent);
    this.router.navigate([], {
      queryParams: {
        eventId: installationEvent.id
      }
    });
  }

  onEventDialogClose() {
    this.router.navigate([], {
      queryParams: {
        eventId: undefined
      }
    });
  }

  private initEventDialog(): Observable<InstallationEvent> {

    const eventId = this.route.snapshot.queryParams.eventId;
    if (!eventId) {
      return Observable.of();
    }

    return this.installationEventsService.retrieve(eventId).do(installationEvent => {
      this.showEvent(installationEvent);
    });
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
    return this.installationEventsService.retrievePaginated(this.installation, extend({}, this.params, tableStateToApiQueryParams(state)));
  }
}

class InstallationEventsTableFilters implements ApiQueryParams, TableFilters {
  constructor(values?: any) {
  }

  isEmpty(): boolean {
    return true;
  }

  toParams() {
    return {};
  }
}
