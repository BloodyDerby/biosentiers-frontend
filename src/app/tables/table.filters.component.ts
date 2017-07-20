import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import isEqual from 'lodash/isEqual';

import { TableFilters, TableManager } from './table.manager';

@Component({
  selector: 'bio-table-filters',
  templateUrl: './table.filters.component.html',
  styleUrls: ['./table.filters.component.styl']
})
export class TableFiltersComponent<T, F extends TableFilters> implements OnInit {
  form: FormGroup;

  @Input()
  private manager: TableManager<T, F>;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.manager.initializeFilters(this.formBuilder);

    this.form
      .valueChanges
      .filter(() => this.form.valid)
      .distinctUntilChanged((previous, next) => isEqual(previous, next))
      .debounceTime(500)
      .subscribe(values => this.updateFilters(values));
  }

  private updateFilters(values: any) {
    this.manager.changeState({
      offset: 0,
      filters: this.manager.convertFilters(values)
    });
  }
}
