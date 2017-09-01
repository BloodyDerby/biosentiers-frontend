import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorsModule } from '../errors';
import { PrettyBytesPipe } from './pretty-bytes.pipe';

@NgModule({
  declarations: [
    PrettyBytesPipe
  ],
  exports: [
    AngularCommonModule,
    ErrorsModule,
    PrettyBytesPipe
  ]
})
export class CommonModule { }
