import { MaterialProperties } from "@/types/MaterialProperties"
import { material, MaterialType } from "@/types/MaterialType"

export const MATERIALS_CONFIG: Record<MaterialType, MaterialProperties> = {
  [material.WATER]: {
    color: "#0d5388",
    isLiquid: true
  },
  [material.SAND]: {
    color: "#eaee1dff",
    isLiquid: false
  },
  [material.LAVA]: {
    color: "#ca0f0fff",
    isLiquid: true
  },
  [material.SNOW]: {
    color: "#e7ddddff",
    isLiquid: false
  },
  [material.STONE]: {
    color: "#948f8fff",
    isLiquid: false,
    isMovable: false
  }
}
