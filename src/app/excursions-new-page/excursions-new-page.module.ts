import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { NewExcursionPageComponent } from './excursions-new-page.component';
import { NewParticipantComponent } from './new-participant.component';

@NgModule({
  imports: [
    BioExcursionsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    NewExcursionPageComponent,
    NewParticipantComponent
  ]
})
export class NewExcursionPageModule { }
