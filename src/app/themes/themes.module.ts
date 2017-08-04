import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiModule } from '../api';
import { PoisModule } from '../pois';
import { ThemeComponent } from './theme.component';
import { ThemesService } from './themes.service';

@NgModule({
  imports: [
    ApiModule,
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
    ThemesService
  ]
})
export class ThemesModule { }
