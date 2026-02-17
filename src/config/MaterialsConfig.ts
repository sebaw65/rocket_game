import { Material, MaterialType } from "@/types/Material"
import { LiquidMaterialSystem } from "@/systems/material-movement/material-type/LiquidMaterialSystem"
import { StaticMaterialSystem } from "@/systems/material-movement/material-type/StaticMaterialSystem"
import { LooseMaterialSystem } from "@/systems/material-movement/material-type/LooseMaterialSystem"
import { MaterialConfig } from "@/components/material/MaterialComponent"

export const MATERIALS_CONFIG: Record<MaterialType, MaterialConfig> = {
  [Material.WATER]: {
    color: "#0d5388",
    isLiquid: true,
    movementSystem: new LiquidMaterialSystem()
  },
  [Material.SAND]: {
    color: "#eaee1dff",
    isLiquid: false,
    movementSystem: new LooseMaterialSystem()
  },
  [Material.LAVA]: {
    color: "#ca0f0fff",
    isLiquid: true,
    movementSystem: new LiquidMaterialSystem()
  },
  [Material.SNOW]: {
    color: "#e7ddddff",
    isLiquid: false,
    movementSystem: new LooseMaterialSystem()
  },
  [Material.STONE]: {
    color: "#948f8fff",
    isLiquid: false,
    isMovable: false,
    movementSystem: new StaticMaterialSystem()
  }
} as const
