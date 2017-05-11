import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectComponent } from 'angular2-select/dist/select.component';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
import Leaflet from 'leaflet';
import { Map } from 'leaflet';
import cloneDeep from 'lodash/cloneDeep';
import includes from 'lodash/includes';
import times from 'lodash/times';
import reduce from 'lodash/reduce';
import moment from 'moment';
import { IMyOptions } from 'ngx-mydatepicker';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { BioThemes } from '../data/themes';
import { BioTrailsService } from '../trails/trails.service';
import { BioZones } from '../data/zones';
import { Excursion } from '../models/excursion';
import { Trail } from '../models/trail';
import { EditExcursionService } from './edit-excursion.service';

@Component({
  selector: 'bio-edit-excursion-pois-step',
  templateUrl: './edit-excursion-pois-step.component.html',
  styleUrls: ['./edit-excursion-pois-step.component.styl']
})
export class EditExcursionPoisStepComponent implements OnInit {

  private excursion: Excursion;

  constructor(private editExcursionService: EditExcursionService) {
  }

  ngOnInit() {
    this.editExcursionService.excursionObs.subscribe((excursion) => {
      this.excursion = excursion;
    });
  };

}
