import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BioExcursionsModule } from '../excursions/excursions.module';
import { NewExcursionPageComponent } from './excursions-new-page.component';
import { NewParticipantComponent } from './new-participant.component';

@NgModule({
  imports: [
    BioExcursionsModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    NewExcursionPageComponent,
    NewParticipantComponent
  ]
})
export class NewExcursionPageModule { }
