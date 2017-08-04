import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormErrorComponent } from './form-error.component';
import { FormGroupErrorDirective } from './form-group-error.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormErrorComponent,
    FormGroupErrorDirective
  ],
  exports: [
    FormErrorComponent,
    FormGroupErrorDirective
  ]
})
export class FormsModule { }
