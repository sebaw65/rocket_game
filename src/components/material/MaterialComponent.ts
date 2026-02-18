import { MaterialMovementSystem } from "@/systems/material-movement/MaterialMovementSystem"
import { DirectionType } from "@/types/Direction"
import { Material } from "./Material"
import { PartialNullable } from "@/types/PartialNullable"

export class MaterialComponent implements PartialNullable<Material> {
  color: string
  currentDirection: DirectionType | null
  movementSystem: MaterialMovementSystem

  constructor(config: Material) {
    this.color = config.color
    this.currentDirection = config.currentDirection ?? null
    this.movementSystem = config.movementSystem
  }
}
