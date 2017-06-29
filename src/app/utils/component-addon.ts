export abstract class ComponentAddon<T> {
  component: T;

  constructor(component: T) {
    this.component = component;
  }
}
