import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth';
import { ExcursionsModule } from '../excursions';
import { HomePageComponent } from './home-page.component';
import { TitleModule } from '../title';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    ExcursionsModule,
    RouterModule,
    TitleModule
  ],
  declarations: [
    HomePageComponent
  ]
})
export class HomePageModule { }
