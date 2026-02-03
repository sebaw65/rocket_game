import { MaterialMovementSystem } from "@/systems/material-movement/MaterialMovementSystem"
import { DirectionType } from "@/types/Direction"

/**
 * Used to store material properties
 */
export class RenderMaterial {
  constructor(
    public color: string,
    public isLiquid: boolean,
    public isMovable: boolean,
    public direction: DirectionType | null,
    public materialMovement: MaterialMovementSystem
  ) {}
}
