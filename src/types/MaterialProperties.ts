import { MaterialMovementSystem } from "@/systems/material-movement/MaterialMovementSystem"
import { DirectionType } from "./Direction"

export interface MaterialProperties {
  color: string
  isLiquid: boolean
  isMovable?: boolean
  direction?: DirectionType
  movementSystemClass: new () => MaterialMovementSystem
}
