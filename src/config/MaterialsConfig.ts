import { MaterialType, MaterialType } from "@/components/material/MaterialType"
import { LiquidMaterialSystem } from "@/systems/material-movement/material-type/LiquidMaterialSystem"
import { StaticMaterialSystem } from "@/systems/material-movement/material-type/StaticMaterialSystem"
import { LooseMaterialSystem } from "@/systems/material-movement/material-type/LooseMaterialSystem"
import { MaterialConfig } from "@/components/material/MaterialComponent"

export const MATERIALS_CONFIG: Record<MaterialType, MaterialConfig> = {
  [MaterialType.WATER]: {
    color: "#0d5388",
    isLiquid: true,
    movementSystem: new LiquidMaterialSystem()
  },
  [MaterialType.SAND]: {
    color: "#eaee1dff",
    isLiquid: false,
    movementSystem: new LooseMaterialSystem()
  },
  [MaterialType.LAVA]: {
    color: "#ca0f0fff",
    isLiquid: true,
    movementSystem: new LiquidMaterialSystem()
  },
  [MaterialType.SNOW]: {
    color: "#e7ddddff",
    isLiquid: false,
    movementSystem: new LooseMaterialSystem()
  },
  [MaterialType.STONE]: {
    color: "#948f8fff",
    isLiquid: false,
    isMovable: false,
    movementSystem: new StaticMaterialSystem()
  }
} as const
