import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import moment from 'moment';
import { IMyDrpOptions } from 'mydaterangepicker';
import { Observable } from 'rxjs/Rx';

import { AuthViewService } from '../auth/auth.view.service';
import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { Excursion, User } from '../models';
import { TableFilters, TableManager, TableState } from '../tables';
import { PaginatedResponse } from '../utils/api';
import { parsePropertiesInto } from '../utils/models';

@Component({
  selector: 'bio-excursions-page',
  templateUrl: './excursions-page.component.html',
  styleUrls: ['./excursions-page.component.styl']
})
export class ExcursionsPageComponent implements OnInit {
  auth: AuthViewService;
  dateRangePickerOptions: IMyDrpOptions;
  tableManager: ExcursionsTableManager;

  constructor(auth: AuthViewService, private excursionsService: BioExcursionsService) {
    this.auth = auth;

    this.dateRangePickerOptions = {
      height: '32px',
      dateFormat: 'dd.mm.yyyy',
      dayLabels: { mo: 'Lun', tu: 'Mar', we: 'Mer', th: 'Jeu', fr: 'Ven', sa: 'Sam', su: 'Dim' },
      monthLabels: { 1: 'Janvier', 2: 'Février', 3: 'Mars', 4: 'Avril', 5: 'Mai', 6: 'Juin', 7: 'Juillet', 8: 'Août', 9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre' },
      selectBeginDateTxt: "Sélectionnez la date de début",
      selectEndDateTxt: "Sélectionnez la date de fin"
    };
  }

  ngOnInit() {
    this.tableManager = new ExcursionsTableManager(this.excursionsService, {
      includeCreator: true
    });
  }
}

class ExcursionsTableManager extends TableManager<Excursion, ExcursionsTableFilters> {
  constructor(private excursionsService: BioExcursionsService, private params?: RetrieveExcursionParams) {
    super();
  }

  getInitialState(): TableState<ExcursionsTableFilters> {

    const original = super.getInitialState();
    original.sorts = [
      {
        property: 'plannedAt',
        direction: 'desc'
      }
    ];

    return original;
  }

  initializeFilters(formBuilder: FormBuilder): FormGroup {

    const now = moment();
    const oneMonthAgo = moment().subtract(1, 'month');

    return formBuilder.group({
      search: [ '' ],
      plannedAtRange: {
        beginDate: {
          year: oneMonthAgo.year(),
          month: oneMonthAgo.month() + 1,
          day: oneMonthAgo.date()
        },
        endDate: {
          year: now.year(),
          month: now.month() + 1,
          day: now.date()
        }
      }
    });
  }

  convertFilters(values: any): ExcursionsTableFilters {
    return new ExcursionsTableFilters(values);
  }

  retrievePage(state: TableState<ExcursionsTableFilters>): Observable<PaginatedResponse<Excursion>> {
    return this.excursionsService.retrievePaginated(extend({}, this.params, pick(state, 'offset', 'limit', 'sorts'), state.filters));
  }
}

class ExcursionsTableFilters implements TableFilters {
  plannedAtGte?: Date;
  plannedAtLt?: Date;
  search?: string;

  constructor(values?: any) {
    parsePropertiesInto(this, values, 'search');

    if (values && values.plannedAtRange) {
      const beginDate = values.plannedAtRange.beginDate;
      this.plannedAtGte = moment(`${beginDate.year}-${beginDate.month}-${beginDate.day}`, 'YYYY-MM-DD').startOf('day').toDate();
      const endDate = values.plannedAtRange.endDate;
      this.plannedAtLt = moment(`${endDate.year}-${endDate.month}-${endDate.day}`, 'YYYY-MM-DD').add(1, 'day').startOf('day').toDate();
    }
  }

  isEmpty(): boolean {
    return !this.plannedAtGte && !this.plannedAtLt && (!this.search || !this.search.length);
  }
}
