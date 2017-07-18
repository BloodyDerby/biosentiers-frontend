import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'ng-select';
import { LeafletModule } from '@asymmetrik/angular2-leaflet/dist';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/ng2-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { BioFormsModule } from '../forms';
import { BioParticipantsModule } from '../participants/participants.module';
import { BioThemesModule } from '../themes/themes.module';
import { BioTrailsModule } from '../trails/trails.module';
import { BioZonesModule } from '../zones/zones.module';
import { EditExcursionPageComponent } from './edit-excursion-page.component';
import { ParticipantFormComponent } from './participant-form.component';
import { TruncatePipe } from '../common/truncate.pipe';
import { EditExcursionDetailsStepComponent } from './edit-excursion-details-step.component';
import { EditExcursionParticipantsStepComponent } from './edit-excursion-participants-step.component';
import { EditExcursionService } from './edit-excursion.service';
import { EditExcursionThemesStepComponent } from './edit-excursion-themes-step.component';
import { EditExcursionZonesStepComponent } from './edit-excursion-zones-step.component';
import { PoisModule } from '../pois/pois.module';
import { WizardModule } from '../wizard/wizard.module';

@NgModule({
  imports: [
    BioExcursionsModule,
    BioFormsModule,
    BioParticipantsModule,
    BioThemesModule,
    BioTrailsModule,
    BioZonesModule,
    CommonModule,
    DatepickerModule,
    LeafletModule,
    NgxMyDatePickerModule,
    PoisModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
    TooltipModule,
    WizardModule
  ],
  declarations: [
    EditExcursionDetailsStepComponent,
    EditExcursionPageComponent,
    EditExcursionParticipantsStepComponent,
    EditExcursionThemesStepComponent,
    EditExcursionZonesStepComponent,
    ParticipantFormComponent,
    TruncatePipe
  ],
  providers: [
    EditExcursionService
  ]
})
export class EditExcursionPageModule { }
