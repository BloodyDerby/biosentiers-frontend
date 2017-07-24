import { Component, Input, OnInit } from '@angular/core';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import { Observable } from 'rxjs/Rx';

import { Theme, Trail, Zone } from '../models';
import { PoisService } from '../pois';

@Component({
  selector: 'bio-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.styl']
})
export class ThemeComponent implements OnInit {
  poisCount: number;

  @Input()
  theme: Theme;

  @Input()
  trail: Trail;

  @Input()
  zones: Zone[];

  @Input()
  countPois: boolean;

  private currentFilters: { [key: string]: any };

  constructor(private poisService: PoisService) {
  }

  ngOnInit() {
    if (!this.theme) {
      throw new Error('Theme input is required');
    } else if (!this.trail) {
      throw new Error('Trail input is required');
    }
  }

  ngDoCheck() {

    const filters = {
      theme: this.theme.name,
      trail: this.trail.id,
      zones: map(this.zones || [], 'href')
    };

    if (!isEqual(filters, this.currentFilters)) {
      this.currentFilters = filters;

      if (this.shouldCountPois()) {
        this.updatePoisCount();
      }
    }
  }

  private updatePoisCount() {
    return this.poisService.count(this.trail, {
      themes: [ this.theme.name ],
      zones: map(this.zones || [], 'href')
    })
      .map(res => res.pagination.effectiveTotal)
      .subscribe(count => this.poisCount = count);
  }

  private shouldCountPois() {
    return this.countPois !== undefined ? this.countPois : true;
  }

}
