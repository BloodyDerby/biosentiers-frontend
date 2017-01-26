import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/modal';

import { BioModalService } from './modal.service';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  providers: [
    BioModalService
  ]
})
export class BioModalModule { }
