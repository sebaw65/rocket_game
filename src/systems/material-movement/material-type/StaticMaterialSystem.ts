import { Entity } from "@/entities/Entity"
import { MaterialMovementSystem } from "../MaterialMovementSystem"
import { MaterialComponent } from "@/components/material/MaterialComponent"

export class StaticMaterialSystem extends MaterialMovementSystem {
  moveEntity(entity: Entity): void {
    const material = entity.getComponent(MaterialComponent)
    if (!material) return

    material.sleeping = true
    return
  }
}
