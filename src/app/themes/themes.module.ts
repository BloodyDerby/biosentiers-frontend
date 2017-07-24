import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BioApiModule } from '../api/api.module';
import { PoisModule } from '../pois';
import { ThemeComponent } from './theme.component';
import { BioThemesService } from './themes.service';

@NgModule({
  imports: [
    BioApiModule,
    CommonModule,
    PoisModule
  ],
  declarations: [
    ThemeComponent
  ],
  exports: [
    ThemeComponent
  ],
  providers: [
    BioThemesService
  ]
})
export class BioThemesModule { }
