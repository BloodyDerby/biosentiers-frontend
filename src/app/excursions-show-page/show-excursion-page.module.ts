import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { TooltipModule } from 'ngx-bootstrap';

import { ExcursionsModule } from '../excursions';
import { ParticipantsModule } from '../participants';
import { ExcursionComponentsModule } from '../excursions-components';
import { ShowExcursionPageComponent } from './show-excursion-page.component';
import { ThemesModule } from '../themes';
import { TitleModule } from '../title';
import { ZonesModule } from '../zones';

@NgModule({
  imports: [
    CommonModule,
    ExcursionsModule,
    ExcursionComponentsModule,
    MomentModule,
    ParticipantsModule,
    RouterModule,
    ThemesModule,
    TitleModule,
    TooltipModule,
    ZonesModule
  ],
  declarations: [
    ShowExcursionPageComponent
  ]
})
export class ShowExcursionPageModule { }
