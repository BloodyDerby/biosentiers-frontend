import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BioAuthModule } from '../auth';
import { BioExcursionsModule } from '../excursions';
import { HomePageComponent } from './home-page.component';

@NgModule({
  imports: [
    BioAuthModule,
    BioExcursionsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    HomePageComponent
  ]
})
export class HomePageModule { }
