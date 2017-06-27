import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { BioThemesService } from './themes.service';

@NgModule({
  imports: [
    BioApiModule
  ],
  providers: [
    BioThemesService
  ]
})
export class BioThemesModule { }
