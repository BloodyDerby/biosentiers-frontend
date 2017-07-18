import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { addClass, removeClass } from '../utils/dom';

@Directive({
  selector: '[formGroupError]'
})
export class FormGroupErrorDirective implements OnInit, OnDestroy {

  @Input('formGroupError')
  control: AbstractControl;

  private subscription: Subscription;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.subscription = this.control.statusChanges
      .map(() => this.control.valid)
      .distinctUntilChanged()
      .subscribe(() => this.updateHasError());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateHasError() {
    const method = this.control.valid ? removeClass : addClass;
    method(this.element, 'has-error');
  }
}
