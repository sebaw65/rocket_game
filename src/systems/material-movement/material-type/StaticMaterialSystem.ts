import { Entity } from "@/entities/Entity"
import { MaterialMovementContext } from "@/systems/material-movement/MaterialMovementContext"
import { MaterialMovementSystem } from "../MaterialMovementSystem"
import { MaterialComponent } from "@/components/material/MaterialComponent"

export class StaticMaterialSystem extends MaterialMovementSystem {
  shouldProcess(entity: Entity): boolean {
    const material = entity.getComponent(MaterialComponent)

    console.log("element")
    return material?.isLiquid === false && material?.isMovable === false
  }

  moveEntity(entity: Entity, ctx: MaterialMovementContext): void {
    return
  }
}
