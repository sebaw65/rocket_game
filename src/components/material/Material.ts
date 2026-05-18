import { MaterialMovementSystem } from "@/systems/material-movement/MaterialMovementSystem"
import { DirectionType } from "@/types/Direction"

export type Material = {
  color: string
  sleeping: boolean | null
  currentDirection: DirectionType | null
  movementSystem: MaterialMovementSystem
}
