export class Entity {
  private components = new Map<Function, any>()

  addComponent(component: any) {
    this.components.set(component.constructor, component)
  }

  getComponent<T>(componentClass: new (...args: any[]) => T): T | undefined {
    return this.components.get(componentClass) as T
  }
}
