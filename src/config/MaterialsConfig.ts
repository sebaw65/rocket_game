import { MaterialProperties } from "@/types/MaterialProperties"
import { MATERIAL, MaterialType } from "@/types/Material"
import { LiquidMaterialSystem } from "@/systems/material-movement/material-type/LiquidMaterialSystem"
import { StaticMaterialSystem } from "@/systems/material-movement/material-type/StaticMaterialSystem"
import { LooseMaterialSystem } from "@/systems/material-movement/material-type/LooseMaterialSystem"

export const MATERIALS_CONFIG: Record<MaterialType, MaterialProperties> = {
  [MATERIAL.WATER]: {
    color: "#0d5388",
    isLiquid: true,
    movementSystemClass: LiquidMaterialSystem
  },
  [MATERIAL.SAND]: {
    color: "#eaee1dff",
    isLiquid: false,
    movementSystemClass: LooseMaterialSystem
  },
  [MATERIAL.LAVA]: {
    color: "#ca0f0fff",
    isLiquid: true,
    movementSystemClass: LiquidMaterialSystem
  },
  [MATERIAL.SNOW]: {
    color: "#e7ddddff",
    isLiquid: false,
    movementSystemClass: LooseMaterialSystem
  },
  [MATERIAL.STONE]: {
    color: "#948f8fff",
    isLiquid: false,
    isMovable: false,
    movementSystemClass: StaticMaterialSystem
  }
} as const
