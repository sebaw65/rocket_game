import { MaterialComponent } from "@/components/material/MaterialComponent"
import { PositionComponent } from "@/components/PositionComponent"

type EntityComponents = MaterialComponent | PositionComponent

export class Entity {
  private components = new Map<Function, any>()

  addComponent(component: EntityComponents) {
    this.components.set(component.constructor, component)
  }

  getComponent<T>(componentClass: new (...args: any[]) => T): T | undefined {
    return this.components.get(componentClass) as T
  }
}
