import { Component, Input, OnInit } from '@angular/core';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';

import { TableManager, TableSort, TableState } from './table.manager';

@Component({
  selector: 'bio-table-sort',
  templateUrl: './table.sort.component.html',
  styleUrls: ['./table.sort.component.styl']
})
export class TableSortComponent<T> implements OnInit {
  state: string;

  @Input()
  private manager: TableManager<T>;
  @Input()
  private property: string;
  @Input()
  private properties: string[];

  ngOnInit() {
    if (this.property && this.properties) {
      throw new Error('Only "property" or "properties" can be set, not both');
    } else if (!this.property && !this.properties) {
      throw new Error('"property" or "properties" must be set');
    }

    this.manager.stateObs.subscribe((state: TableState) => this.updateState(state));
  }

  toggleSort() {
    this.manager.changeState({
      offset: 0,
      sorts: this.getSort(!this.state || this.state == 'desc' ? 'asc' : 'desc')
    });
  }

  private updateState(state: TableState) {
    const sortProperties = map(state.sorts || [], 'property');
    if (isEqual(this.properties || [ this.property ], sortProperties)) {
      this.state = state.sorts[0].direction || 'asc';
    } else {
      this.state = null;
    }
  }

  private getSort(direction: string): TableSort[] {
    const properties = this.properties || [ this.property ];
    return properties.map(property => {
      return {
        property: property,
        direction: direction
      };
    })
  }
}
