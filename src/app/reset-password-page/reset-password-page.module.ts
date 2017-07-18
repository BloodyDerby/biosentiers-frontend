import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BioApiModule } from '../api';
import { BioFormsModule } from '../forms';
import { ResetPasswordPageComponent } from './reset-password-page.component';

@NgModule({
  imports: [
    BioApiModule,
    BioFormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ResetPasswordPageComponent
  ]
})
export class ResetPasswordPageModule { }
