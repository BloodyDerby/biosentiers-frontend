import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { SelectModule } from 'ng-select';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { TruncatePipe } from '../common';
import { EditExcursionDetailsStepComponent } from './edit-excursion-details-step.component';
import { EditExcursionParticipantsStepComponent } from './edit-excursion-participants-step.component';
import { EditExcursionPageComponent } from './edit-excursion-page.component';
import { EditExcursionService } from './edit-excursion.service';
import { EditExcursionThemesStepComponent } from './edit-excursion-themes-step.component';
import { EditExcursionZonesStepComponent } from './edit-excursion-zones-step.component';
import { ExcursionComponentsModule } from '../excursions-components';
import { ExcursionsModule } from '../excursions';
import { FormsModule } from '../forms';
import { ParticipantFormComponent } from './participant-form.component';
import { ParticipantsModule } from '../participants';
import { ThemesModule } from '../themes';
import { TitleModule } from '../title';
import { TrailsModule } from '../trails';
import { WizardModule } from '../wizard';
import { ZonesModule } from '../zones';

@NgModule({
  imports: [
    ExcursionsModule,
    CommonModule,
    DatepickerModule,
    ExcursionComponentsModule,
    FormsModule,
    MomentModule,
    NgxMyDatePickerModule,
    ParticipantsModule,
    ReactiveFormsModule,
    RouterModule,
    SelectModule,
    ThemesModule,
    TitleModule,
    TooltipModule,
    TrailsModule,
    WizardModule,
    ZonesModule
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
