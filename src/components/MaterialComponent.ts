import { MATERIALS_CONFIG } from "@/config/MaterialsConfig"
import { Component } from "@/types/Component"
import { MaterialProperties } from "@/types/MaterialProperties"
import { MaterialType } from "@/types/MaterialType"

export class MaterialComponent extends Component {
  public properties: MaterialProperties

  constructor(public type: MaterialType) {
    super()
    this.properties = MATERIALS_CONFIG[type]!
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
}
