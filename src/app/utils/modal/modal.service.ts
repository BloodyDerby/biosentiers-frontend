import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';

import { BioModal } from './modal';

@Injectable()
export class BioModalService {

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) { }

  openComponentDialog(componentClass: Type<BioModal>, viewContainerRef: ViewContainerRef) {

    const modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const modalComponent = viewContainerRef.createComponent(modalComponentFactory);
    modalComponent.changeDetectorRef.detectChanges();

    modalComponent.instance.open();

    return modalComponent;
  }

}
