import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardComponent } from './wizard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WizardComponent
  ],
  exports: [
    WizardComponent
  ]
})
export class WizardModule { }
