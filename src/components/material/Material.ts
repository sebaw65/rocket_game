import { MaterialMovementSystem } from "@/systems/material-movement/MaterialMovementSystem"
import { DirectionType } from "@/types/Direction"

export type Material = {
  color: string
  currentDirection?: DirectionType
  movementSystem: MaterialMovementSystem
}
