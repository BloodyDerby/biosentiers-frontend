import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

import { WizardStep } from './wizard-step';

@Component({
  selector: 'bio-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.styl']
})
export class WizardComponent implements OnInit {

  @Input()
  steps: WizardStep[];
  @Output()
  onStepChanged: EventEmitter<WizardStep>;

  progress: number;
  currentStep: number;

  constructor() { }

  ngOnInit() {
    this.progress = 0;
    this.currentStep = 0;
  }

  getStepWidth() {
    return (100 / this.steps.length) + '%';
  }

  isStepActive(step: WizardStep) {
    return this.currentStep === this.steps.indexOf(step);
  }

  isStepActivated(step: WizardStep) {
    return this.currentStep > this.steps.indexOf(step);
  }

}
