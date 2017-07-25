import { ElementRef } from '@angular/core';

type Element = ElementRef | HTMLElement;

export function addClass(element: Element, ...classes) {
  getNativeElement(element).classList.add(...classes);
}

export function removeClass(element: Element, ...classes) {
  getNativeElement(element).classList.remove(...classes);
}

export function findElement(root: Element, tagName: string) {
  return getNativeElement(root).getElementsByTagName(tagName)[0];
}

export function findClosestParent(element: Element, tagName: string) {
  const nativeElement = getNativeElement(element);

  let parent = nativeElement;
  do {
    parent = parent.parentElement;
    if (parent.tagName == tagName) {
      break;
    }
  } while(parent);

  return parent;
}

function getNativeElement(element: Element): HTMLElement {
  return element instanceof ElementRef ? element.nativeElement : element;
}
