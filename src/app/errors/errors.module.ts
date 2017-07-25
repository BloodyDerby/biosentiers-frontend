import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BioAuthModule } from '../auth';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    BioAuthModule,
    CommonModule
  ],
  declarations: [
    ErrorComponent
  ],
  exports: [
    ErrorComponent
  ]
})
export class ErrorsModule { }
