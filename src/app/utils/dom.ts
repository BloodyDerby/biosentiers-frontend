import { ElementRef } from '@angular/core';

export function addClass(element: ElementRef | HTMLElement, ...classes) {
  getNativeElement(element).classList.add(...classes);
}

export function removeClass(element: ElementRef | HTMLElement, ...classes) {
  getNativeElement(element).classList.remove(...classes);
}

function getNativeElement(element: ElementRef | HTMLElement) {
  return element instanceof ElementRef ? element.nativeElement : element;
}
