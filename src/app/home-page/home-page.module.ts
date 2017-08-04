import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth';
import { ExcursionsModule } from '../excursions';
import { HomePageComponent } from './home-page.component';

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    ExcursionsModule,
    RouterModule
  ],
  declarations: [
    HomePageComponent
  ]
})
export class HomePageModule { }
