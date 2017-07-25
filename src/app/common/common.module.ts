import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorsModule } from '../errors';

@NgModule({
  exports: [
    AngularCommonModule,
    ErrorsModule
  ]
})
export class CommonModule { }
