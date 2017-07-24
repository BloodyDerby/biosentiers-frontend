import { Component, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import includes from 'lodash/includes';
import pull from 'lodash/pull';
import { Observable } from 'rxjs/Rx';

import { Trail, Zone } from '../models';

@Component({
  selector: 'bio-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZoneListComponent),
      multi: true
    }
  ]
})
export class ZoneListComponent implements ControlValueAccessor, OnInit {

  @Input()
  zones: Zone[];

  @Input()
  trail: Trail;

  private onChange: (value: string[]) => void;
  private onTouched: (...args: any[]) => void;
  private selectedZones: string[];
  private touched: boolean;

  constructor() {
    this.touched = false;
  }

  ngOnInit() {
    if (!this.zones) {
      throw new Error('Zones input is required');
    }

    this.selectedZones = [];
  }

  writeValue(value: string[]) {
    this.selectedZones = value;
  }

  registerOnChange(onChange: (value: string[]) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: (...args: any[]) => void) {
    this.touched = false;
    this.onTouched = onTouched;
  }

  isZoneSelected(zone: Zone): boolean {
    return includes(this.selectedZones, zone.href);
  }

  toggleZone(zone: Zone) {
    if (this.isZoneSelected(zone)) {
      pull(this.selectedZones, zone.href);
    } else {
      this.selectedZones.push(zone.href);
    }

    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }

    this.onChange(this.selectedZones);
  }
}
