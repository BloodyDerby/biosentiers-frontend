import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { ZonesService } from '../zones';
import { EditExcursionService } from './edit-excursion.service';
import { Excursion, Zone } from '../models';

@Component({
  selector: 'bio-edit-excursion-zones-step',
  templateUrl: './edit-excursion-zones-step.component.html',
  styleUrls: ['./edit-excursion-zones-step.component.styl']
})
export class EditExcursionZonesStepComponent implements OnInit {
  excursion: Excursion;
  excursionForm: FormGroup;
  zones: Zone[];
  initError: Error;

  constructor(private editExcursionService: EditExcursionService, private zonesService: ZonesService) {
  }

  ngOnInit() {
    this.initExcursion()
      .switchMap(excursion => this.initZones(excursion))
      .subscribe(undefined, err => this.initError = err);
  }

  selectAll() {
    if (this.excursionForm.get('zoneHrefs').value.length < this.zones.length) {
      this.excursionForm.get('zoneHrefs').setValue(this.zones.map(zone => zone.href));
    }
  }

  unselectAll() {
    if (this.excursionForm.get('zoneHrefs').value.length !== 0) {
      this.excursionForm.get('zoneHrefs').setValue([]);
    }
  }

  private initExcursion(): Observable<Excursion> {
    return this.editExcursionService.excursionObs.first().do((excursion: Excursion) => {
      this.excursion = excursion;
      this.excursionForm = this.editExcursionService.excursionForm;
    });
  }

  private initZones(excursion: Excursion): Observable<Zone[]> {
    return this.zonesService.retrieveAll(excursion.trail).do(zones => this.zones = zones);
  }

}
