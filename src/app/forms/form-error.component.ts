import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'bio-form-error',
  template: `
    <span class='help-block' *ngIf='visible'><ng-content></ng-content></span>
  `,
  styles: [
    `
      .help-block {
        font-weight: bold;
      }
    `
  ]
})
export class FormErrorComponent implements OnInit, OnDestroy {

  @Input()
  control: AbstractControl;

  @Input()
  error: string;

  @Input()
  dirty: boolean;

  @Input()
  touched: boolean;

  visible: boolean;

  private subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.visible = this.hasError();

    this.subscription = this.control.statusChanges
      .map(() => this.hasError())
      .distinctUntilChanged()
      .subscribe(hasError => this.visible = hasError);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private hasError(): boolean {

    const mustBeDirty = this.dirty !== undefined ? this.dirty : true;
    const mustBeTouched = this.touched !== undefined ? this.touched : false;

    return (!mustBeDirty || this.control.dirty)
      && (!mustBeTouched || this.control.touched)
      && (this.error ? this.control.hasError(this.error) : !!this.control.errors);
  }

}
