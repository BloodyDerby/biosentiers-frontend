import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'angular2-select';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { BioParticipantsModule } from '../participants/participants.module';
import { BioTrailsModule } from '../trails/trails.module';
import { EditExcursionPageComponent } from './edit-excursion-page.component';
import { ParticipantFormComponent } from './participant-form.component';
import { TruncatePipe } from '../common/truncate.pipe';
import { EditExcursionDetailsStepComponent } from './edit-excursion-details-step.component';
import { EditExcursionParticipantsStepComponent } from './edit-excursion-participants-step.component';
import { EditExcursionService } from './edit-excursion.service';
import { EditExcursionPoisStepComponent } from './edit-excursion-pois-step.component';

@NgModule({
  imports: [
    BioExcursionsModule,
    BioParticipantsModule,
    BioTrailsModule,
    CommonModule,
    DatepickerModule,
    NgxMyDatePickerModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule
  ],
  declarations: [
    EditExcursionDetailsStepComponent,
    EditExcursionPageComponent,
    EditExcursionParticipantsStepComponent,
    EditExcursionPoisStepComponent,
    LeafletDirective,
    ParticipantFormComponent,
    TruncatePipe
  ],
  providers: [
    EditExcursionService
  ]
})
export class EditExcursionPageModule { }
