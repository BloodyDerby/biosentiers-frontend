import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import find from 'lodash/find';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { Observable } from 'rxjs/Rx';

import { CanActivateStep } from './wizard.step.can-activate';
import { WizardStep } from './wizard.step';

type StepRef = number | string | WizardStep;

@Component({
  selector: 'bio-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.styl']
})
export class WizardComponent implements OnInit {

  @Input()
  steps: WizardStep[];
  @Input()
  guards: CanActivateStep[];
  @Output()
  onStepChanged: EventEmitter<WizardStep>;

  progress: number;
  currentStep: number;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.progress = 0;
    this.currentStep = this.steps.indexOf(this.getInitialStep());
    this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.updateCurrentStep();
      });
  }

  getStepWidth() {
    return (100 / this.steps.length) + '%';
  }

  getProgressWidth() {
    if (this.currentStep == this.steps.length - 1) {
      return '100%';
    }

    const stepWidth = 100 / this.steps.length;
    return ((this.currentStep * stepWidth) + (stepWidth / 2)) + '%';
  }

  isStepActive(stepRef: StepRef): boolean {
    return this.currentStep === this.steps.indexOf(this.getStep(stepRef));
  }

  isStepEnabled(stepRef: StepRef): Observable<boolean> {
    return this.getStep(stepRef).isEnabled();
  }

  isStepEnabledOnly(stepRef: StepRef): Observable<boolean> {
    return Observable.of(!this.isStepActive(stepRef)).merge(this.isStepEnabled(stepRef)).every((result: boolean) => result);
  }

  canActivateStep(stepRef: StepRef): Observable<boolean> {
    return this.isStepEnabled(stepRef).merge(this.getStep(stepRef).canActivate()).every((result: boolean) => result);
  }

  isNextStepEnabled(): Observable<boolean> {
    const nextStep = this.getNextStep();
    return !!nextStep && nextStep.isEnabled();
  }

  goToNextStep(): Promise<WizardStep> {
    const nextStep = this.getNextStep();
    return this.goToStep(nextStep);
  }

  isPreviousStepEnabled(): Observable<boolean> {
    const previousStep = this.getPreviousStep();
    return !!previousStep && previousStep.isEnabled();
  }

  goToPreviousStep(): Promise<WizardStep> {
    const previousStep = this.getPreviousStep();
    return this.goToStep(previousStep);
  }

  goToStep(stepRef: StepRef): Promise<WizardStep> {
    return this.canActivateStep(stepRef).map((enabled) => {
      if (!enabled) {
        return null;
      }

      const step = this.getStep(stepRef);
      if (step.route) {
        this.router.navigate(step.route, step.routeExtras);
      } else {
        this.currentStep = this.steps.indexOf(step);
      }
    }).toPromise();
  }

  private updateCurrentStep() {

    const step =  this.steps.find((step) => {
      return this.router.isActive(step.getUrlTree(this.router), true);
    });

    if (step) {
      this.currentStep = this.steps.indexOf(step);
    }
  }

  private getInitialStep() {

    const step = this.steps.find((step) => {
      return this.router.isActive(step.getUrlTree(this.router), true);
    });

    return step || this.steps[0];
  }

  private getNextStep() {
    return this.currentStep < this.steps.length -1 ? this.steps[this.currentStep + 1] : undefined;
  }

  private getPreviousStep() {
    return this.currentStep > 0 ? this.steps[this.currentStep - 1] : undefined;
  }

  private getStep(stepRef: StepRef): WizardStep {

    let step;
    if (isNumber(stepRef)) {
      step = this.steps[stepRef];
    } else if (isString(stepRef)) {
      step = find(this.steps, { id: stepRef });
    } else {
      step = stepRef;
    }

    if (!step) {
      throw new Error(`Unknown wizard step ${step}`);
    }

    return step;
  }

}
