import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import { Observable } from 'rxjs/Rx';

import { ApiQueryParams, PaginatedResponse, tableStateToApiQueryParams } from '../api';
import { InvitationDialogComponent } from '../invitation-dialog';
import { TableFilters, TableManager, TableState } from '../tables';
import { RetrieveUserParams, UsersService } from '../users';
import { User } from '../models';
import { TitleService } from '../title';

@Component({
  selector: 'bio-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.styl']
})
export class UsersPageComponent implements OnInit {
  tableManager: UsersTableManager;

  @ViewChild(InvitationDialogComponent) invitationDialog: InvitationDialogComponent;

  constructor(private titleService: TitleService, private usersService: UsersService) {
  }

  ngOnInit() {
    this.titleService.setTitle([ 'Utilisateurs' ]);
    this.tableManager = new UsersTableManager(this.usersService);
  }

  openInvitationDialog() {
    this.invitationDialog.open();
  }

}

class UsersTableManager extends TableManager<User, UsersTableFilters> {
  constructor(private usersService: UsersService, private params?: RetrieveUserParams) {
    super();
  }

  getInitialState(): TableState<UsersTableFilters> {

    const original = super.getInitialState();
    original.sorts = [
      {
        property: 'createdAt',
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

  convertFilters(values: any): UsersTableFilters {
    return new UsersTableFilters(values);
  }

  retrievePage(state: TableState<UsersTableFilters>): Observable<PaginatedResponse<User>> {
    return this.usersService.retrievePaginated(extend({}, this.params, tableStateToApiQueryParams(state)));
  }
}

class UsersTableFilters implements ApiQueryParams, TableFilters {
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
