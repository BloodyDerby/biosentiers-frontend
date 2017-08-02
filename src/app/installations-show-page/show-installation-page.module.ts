import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { TooltipModule } from 'ngx-bootstrap';

import { InstallationsModule } from '../installations';
import { InstallationEventsModule } from '../installation-events';
import { ShowInstallationPageComponent } from './show-installation-page.component';
import { TablesModule } from '../tables';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    ReactiveFormsModule,
    RouterModule,
    TablesModule,
    TooltipModule,
    InstallationsModule,
    InstallationEventsModule
  ],
  declarations: [
    ShowInstallationPageComponent
  ]
})
export class ShowInstallationPageModule { }
