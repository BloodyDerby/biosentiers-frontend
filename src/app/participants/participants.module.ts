import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { BioParticipantsService } from './participants.service';

@NgModule({
  imports: [
    BioApiModule
  ],
  providers: [
    BioParticipantsService
  ]
})
export class BioParticipantsModule { }
