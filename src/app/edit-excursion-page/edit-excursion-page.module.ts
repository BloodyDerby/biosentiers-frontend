import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng-select';
import { LeafletModule } from '@asymmetrik/angular2-leaflet/dist';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { BioParticipantsModule } from '../participants/participants.module';
import { BioThemesModule } from '../themes/themes.module';
import { BioTrailsModule } from '../trails/trails.module';
import { BioZonesModule } from '../zones/zones.module';
import { EditExcursionPageComponent } from './edit-excursion-page.component';
import { ParticipantFormComponent } from './participant-form.component';
import { TruncatePipe } from '../common/truncate.pipe';
import { EditExcursionDetailsStepComponent } from './edit-excursion-details-step.component';
import { EditExcursionParticipantsStepComponent } from './edit-excursion-participants-step.component';
import { EditExcursionPoisComponent } from './edit-excursion-pois.component';
import { EditExcursionPoisStepComponent } from './edit-excursion-pois-step.component';
import { EditExcursionService } from './edit-excursion.service';
import { WizardModule } from '../wizard/wizard.module';

@NgModule({
  imports: [
    BioExcursionsModule,
    BioParticipantsModule,
    BioThemesModule,
    BioTrailsModule,
    BioZonesModule,
    CommonModule,
    DatepickerModule,
    LeafletModule,
    NgxMyDatePickerModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
    WizardModule
  ],
  declarations: [
    EditExcursionDetailsStepComponent,
    EditExcursionPageComponent,
    EditExcursionParticipantsStepComponent,
    EditExcursionPoisComponent,
    EditExcursionPoisStepComponent,
    ParticipantFormComponent,
    TruncatePipe
  ],
  providers: [
    EditExcursionService
  ]
})
export class EditExcursionPageModule { }
