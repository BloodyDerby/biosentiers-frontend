import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { BioParticipantsModule } from '../participants/participants.module';
import { EditExcursionPageComponent } from './edit-excursion-page.component';
import { ParticipantFormComponent } from './participant-form.component';

@NgModule({
  imports: [
    BioExcursionsModule,
    BioParticipantsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditExcursionPageComponent,
    ParticipantFormComponent
  ]
})
export class EditExcursionPageModule { }
