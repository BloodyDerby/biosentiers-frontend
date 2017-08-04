import { NgModule } from '@angular/core';

import { ApiModule } from '../api';
import { ParticipantsService } from './participants.service';

@NgModule({
  imports: [
    ApiModule
  ],
  providers: [
    ParticipantsService
  ]
})
export class ParticipantsModule { }
