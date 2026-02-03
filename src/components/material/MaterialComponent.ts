import { MATERIALS_CONFIG } from "@/config/MaterialsConfig"
import { MaterialProperties } from "@/types/MaterialProperties"
import { MaterialType } from "@/types/Material"
import { DirectionType } from "@/types/Direction"
import { MaterialMovementSystem } from "@/systems/material-movement/MaterialMovementSystem"

/**
 * Used to get data from config file
 */
export class MaterialComponent {
  public movementSystem: MaterialMovementSystem
  private properties: MaterialProperties

  constructor(type: MaterialType) {
    this.properties = MATERIALS_CONFIG[type]

    const movementSystemClass = this.properties.movementSystemClass
    this.movementSystem = new movementSystemClass()
  }

  getColor(): string {
    return this.properties.color
  }

  isLiquid(): boolean {
    return this.properties.isLiquid
  }

  isMovable(): boolean {
    return this.properties.isMovable ?? true
  }

  getDirection(): DirectionType | null {
    if (!this.properties.direction) return null
    return this.properties.direction
  }
}
