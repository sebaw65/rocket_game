import { Entity } from "@/entities/Entity"
import { MaterialMovementContext } from "@/types/MaterialMovementContext"

export abstract class MaterialMovementSystem {
  abstract shouldProcess(entity: Entity): boolean
  abstract moveEntity(entity: Entity, ctx: MaterialMovementContext): void

  update(entity: Entity, ctx: MaterialMovementContext) {
    if (!this.shouldProcess(entity)) return

    this.moveEntity(entity, ctx)
  }
}
