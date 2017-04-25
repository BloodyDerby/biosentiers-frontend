import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectComponent } from 'angular2-select/dist/select.component';
import times from 'lodash/times';
import reduce from 'lodash/reduce';
import moment from 'moment';
import { IMyOptions } from 'ngx-mydatepicker';

import { BioExcursionsService, RetrieveExcursionParams } from '../excursions/excursions.service';
import { BioParticipantsService } from '../participants/participants.service';
import { BioTrailsService } from '../trails/trails.service';
import { Excursion } from '../models/excursion';
import { Participant } from '../models/participant';
import { Trail } from '../models/trail';

@Component({
  selector: 'bio-edit-excursion-page',
  templateUrl: './edit-excursion-page.component.html',
  styleUrls: ['./edit-excursion-page.component.styl']
})
export class EditExcursionPageComponent implements OnInit {

  private excursion: Excursion;
  private excursionForm: FormGroup;
  private trailChoices: Array<{ [s: string]: string; }>;

  @ViewChild('trailIdSelect')
  private trailIdSelect: SelectComponent;

  private datepickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
    dayLabels: { mo: 'Lun', tu: 'Mar', we: 'Mer', th: 'Jeu', fr: 'Ven', sa: 'Sam', su: 'Dim' },
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
    editableMonthAndYear: false,
    monthLabels: { 1: 'Janvier', 2: 'Février', 3: 'Mars', 4: 'Avril', 5: 'Mai', 6: 'Juin', 7: 'Juillet', 8: 'Août', 9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre' },
    todayBtnTxt: 'Aujourd\'hui'
  };

  constructor(private excursionsService: BioExcursionsService, private formBuilder: FormBuilder, private participantsService: BioParticipantsService, private route: ActivatedRoute, private router: Router, private trailsService: BioTrailsService) {
  }

  ngOnInit() {
    this.initializeExcursionForm();

    const excursionId: String = this.route.snapshot.params['id'];
    if (excursionId) {
      this.loadExcursion(excursionId);
    } else {
      this.excursion = new Excursion();
      this.loadTrails();
    }
  }

  initializeExcursionForm() {
    this.excursionForm = this.formBuilder.group({
      trailId: [ '', Validators.required ],
      name: [ '', Validators.maxLength(60) ],
      plannedAt: [ '', Validators.required ],
      participants: this.formBuilder.array([]),
      participantsIncrement: [ '1' ]
    });

    var now: Date = moment().startOf('day').toDate();
    this.excursionForm.controls['plannedAt'].setValue({
      date: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
      },
      jsdate: now
    });
  }

  loadExcursion(excursionId: String) {
    var params: RetrieveExcursionParams = {
      includeTrail: true
    };
    this.excursionsService.retrieve(excursionId, params).subscribe(excursion => {

      this.excursion = excursion;
      this.excursionForm.patchValue({
        name: excursion.name
        // FIXME: update excursion date
      });

      this.participantsService.retrieveAll(this.excursion).subscribe(participants => {
        if (participants.length) {
          participants.forEach(participant => this.addParticipant(participant));
        } else {
          this.addParticipant();
        }
      });
    });
  }

  loadTrails() {
    this.trailsService.retrieveAll().subscribe(trails => {
      this.trailChoices = reduce(trails, (memo, trail) => {
        memo.push({
          value: trail.id,
          label: trail.name
        });

        return memo;
      }, []);

      if (trails.length) {
        setTimeout(() => this.trailIdSelect.select(trails[0].id), 0);
      }
    });
  }

  saveExcursion(event) {
    event.preventDefault();

    if (!this.excursion.id) {
      this.excursionsService.create(this.getFormExcursion()).subscribe(excursion => {
        this.router.navigate([ '/excursions', excursion.id ])
      });
    }
  }

  addParticipantBatch() {
    times(this.excursionForm.value.participantsIncrement, () => this.addParticipant());
  }

  addParticipant(participant?: Participant) {
    this.getParticipantsFormArray().push(this.formBuilder.group({
      id: [ participant ? participant.id : null ],
      name: [ participant ? participant.name : '' ]
    }));
  }

  onParticipantRemoved(participantForm: FormGroup) {
    const participantsFormArray: FormArray = this.getParticipantsFormArray();
    participantsFormArray.removeAt(participantsFormArray.controls.indexOf(participantForm));
  }

  getParticipantsFormArray(): FormArray {
    return <FormArray>this.excursionForm.controls['participants'];
  }

  getFormExcursion(): Excursion {
    var value = this.excursionForm.value;
    return new Excursion({
      trailId: value.trailId,
      name: value.name,
      plannedAt: value.plannedAt.jsdate
    });
  }

}
