import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import moment from 'moment';
import { IMyDrpOptions } from 'mydaterangepicker';
import { Observable } from 'rxjs/Rx';

import { ApiQueryParams, ComparisonOperator, DateComparisonParam, PaginatedResponse, tableStateToApiQueryParams } from '../api';
import { AuthViewService } from '../auth';
import { ExcursionsService, RetrieveExcursionParams } from '../excursions';
import { Excursion, User } from '../models';
import { TableFilters, TableManager, TableState } from '../tables';
import { TitleService } from '../title';

@Component({
  selector: 'bio-excursions-page',
  templateUrl: './excursions-page.component.html',
  styleUrls: ['./excursions-page.component.styl']
})
export class ExcursionsPageComponent implements OnInit {
  auth: AuthViewService;
  dateRangePickerOptions: IMyDrpOptions;
  tableManager: ExcursionsTableManager;

  constructor(auth: AuthViewService, private excursionsService: ExcursionsService, private titleService: TitleService) {
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

    this.titleService.setTitle([ 'Sorties' ]);
  }
}

class ExcursionsTableManager extends TableManager<Excursion, ExcursionsTableFilters> {
  constructor(private excursionsService: ExcursionsService, private params?: RetrieveExcursionParams) {
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
    return this.excursionsService.retrievePaginated(extend({}, this.params, tableStateToApiQueryParams(state)));
  }
}

class ExcursionsTableFilters implements ApiQueryParams, TableFilters {
  plannedAt?: DateComparisonParam[];
  search?: string;

  constructor(values?: any) {
    extend(this, pick(values, 'search'));

    if (values && values.plannedAtRange) {
      this.plannedAt = [];

      const beginDateObject = values.plannedAtRange.beginDate;
      const beginDate = moment(`${beginDateObject.year}-${beginDateObject.month}-${beginDateObject.day}`, 'YYYY-MM-DD').startOf('day').toDate();
      this.plannedAt.push(new DateComparisonParam(ComparisonOperator.GreaterThanOrEqualTo, beginDate));

      const endDateObject = values.plannedAtRange.endDate;
      const endDate = moment(`${endDateObject.year}-${endDateObject.month}-${endDateObject.day}`, 'YYYY-MM-DD').add(1, 'day').startOf('day').toDate();
      this.plannedAt.push(new DateComparisonParam(ComparisonOperator.LessThan, endDate));
    }
  }

  isEmpty(): boolean {
    return (!this.plannedAt || !this.plannedAt.length) && (!this.search || !this.search.length);
  }

  toParams(): any {
    return pick(this, 'plannedAt', 'search');
  }
}
