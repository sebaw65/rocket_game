import { Entity } from "@/entities/Entity"
import { MaterialMovementContext } from "@/types/MaterialMovementContext"
import { MaterialMovementSystem } from "../MaterialMovementSystem"
import { RenderMaterial } from "@/components/material/RenderMaterial"

export class StaticMaterialSystem extends MaterialMovementSystem {
  shouldProcess(entity: Entity): boolean {
    const material = entity.getComponent(RenderMaterial)

    console.log("element")
    return material?.isLiquid === false && material?.isMovable === false
  }

  moveEntity(entity: Entity, ctx: MaterialMovementContext): void {
    return
  }
}
