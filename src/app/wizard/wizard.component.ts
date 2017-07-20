import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import find from 'lodash/find';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { Observable } from 'rxjs/Rx';

import { CanActivateStep } from './wizard.step.can-activate';
import { WizardStep } from './wizard.step';
import { WizardStepRoute } from './wizard.step.route';

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
    this.selectInitialStep();
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

    const step = this.getStep(stepRef);
    const index = this.steps.indexOf(step);
    const steps = this.steps.slice(0, index + 1);

    return Observable.from(steps.map(step => step.isEnabled())).mergeAll().every((enabled: boolean) => enabled);
  }

  isStepEnabledOnly(stepRef: StepRef): Observable<boolean> {
    return Observable.of(!this.isStepActive(stepRef)).merge(this.isStepEnabled(stepRef)).every((result: boolean) => result);
  }

  canActivateStep(stepRef: StepRef): Observable<boolean> {
    return this.isStepEnabled(stepRef).merge(this.getStep(stepRef).canActivate()).every((result: boolean) => result);
  }

  isLastStep(): boolean {
    return this.currentStep == this.steps.length - 1;
  }

  isNextStepEnabled(): Observable<boolean> {
    const nextStep = this.getNextStep();
    return nextStep ? nextStep.isEnabled() : Observable.of(false);
  }

  goToNextStep(): Promise<WizardStep> {
    const nextStep = this.getNextStep();
    return this.goToStep(nextStep);
  }

  isPreviousStepEnabled(): Observable<boolean> {
    const previousStep = this.getPreviousStep();
    return previousStep ? previousStep.isEnabled() : Observable.of(false);
  }

  goToPreviousStep(): Promise<WizardStep> {
    const previousStep = this.getPreviousStep();
    return this.goToStep(previousStep);
  }

  goToStep(stepRef: StepRef): Promise<WizardStep> {
    const step = this.getStep(stepRef);
    return this.canActivateStep(stepRef).filter(can => can).switchMap(() => step.route).do(route => {
      if (route) {
        route.navigate(this.router);
      } else {
        this.currentStep = this.steps.indexOf(step);
      }
    }).map(() => step).toPromise();
  }

  private updateCurrentStep() {
    this.getCurrentStepByRoute().filter(step => !!step).subscribe(step => {
      this.currentStep = this.steps.indexOf(step);
    });
  }

  private selectInitialStep() {
    this.getCurrentStepByRoute().subscribe(step => {
      this.currentStep = step ? this.steps.indexOf(step) : 0;
    });
  }

  private getNextStep() {
    return this.currentStep < this.steps.length - 1 ? this.steps[this.currentStep + 1] : undefined;
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

  private getCurrentStepByRoute(): Observable<WizardStep> {
    return Observable.from(this.steps).mergeMap(step => step.route).map(route => {
      return !!route && this.router.isActive(route.getUrlTree(this.router), true);
    }).findIndex(active => active).map(i => this.steps[i]).defaultIfEmpty();
  }

}
