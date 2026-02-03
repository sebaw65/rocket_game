import { Entity } from "@/entities/Entity"
import { MaterialMovementContext } from "@/types/MaterialMovementContext"
import { MaterialMovementSystem } from "../MaterialMovementSystem"

// TODO Ruch w doł i po skosie
export class LooseMaterialSystem extends MaterialMovementSystem {
  shouldProcess(entity: Entity): boolean {
    throw new Error("Method not implemented.")
  }
  moveEntity(entity: Entity, ctx: MaterialMovementContext): void {
    throw new Error("Method not implemented.")
  }
}
