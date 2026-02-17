import { MaterialMovementSystem } from "@/systems/material-movement/MaterialMovementSystem"
import { DirectionType } from "@/types/Direction"

export type MaterialConfig = {
  color: string
  isLiquid?: boolean
  isMovable?: boolean
  currentDirection?: DirectionType
  movementSystem: MaterialMovementSystem
}

export class MaterialComponent {
  color: string
  isLiquid: boolean
  isMovable: boolean
  currentDirection: DirectionType | null
  movementSystem: MaterialMovementSystem

  constructor(config: MaterialConfig) {
    this.color = config.color
    this.isLiquid = config.isLiquid ?? false
    this.isMovable = config.isMovable ?? false
    this.currentDirection = config.currentDirection ?? null
    this.movementSystem = config.movementSystem
  }
}
