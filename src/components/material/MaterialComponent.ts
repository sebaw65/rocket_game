import { MaterialMovementSystem } from "@/systems/material-movement/MaterialMovementSystem"
import { DirectionType } from "@/types/Direction"
import { Material } from "./Material"

export class MaterialComponent implements Material {
  color: string
  sleeping: boolean = false
  currentDirection: DirectionType | null
  movementSystem: MaterialMovementSystem

  constructor(
    config: Omit<MaterialComponent, "sleeping" | "currentDirection"> &
      Partial<Pick<MaterialComponent, "sleeping" | "currentDirection">>
  ) {
    this.color = config.color
    this.sleeping = config?.sleeping ?? false
    this.currentDirection = config?.currentDirection ?? null
    this.movementSystem = config.movementSystem
  }
}
