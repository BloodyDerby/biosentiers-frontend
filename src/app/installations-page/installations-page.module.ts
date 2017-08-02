import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { TooltipModule } from 'ngx-bootstrap';

import { InstallationsModule } from '../installations';
import { InstallationsPageComponent } from './installations-page.component';
import { TablesModule } from '../tables';

@NgModule({
  imports: [
    CommonModule,
    InstallationsModule,
    MomentModule,
    ReactiveFormsModule,
    RouterModule,
    TablesModule,
    TooltipModule
  ],
  declarations: [
    InstallationsPageComponent
  ]
})
export class InstallationsPageModule { }
