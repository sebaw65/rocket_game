import { MaterialProperties } from "@/types/MaterialProperties"
import { MATERIAL, MaterialType } from "@/types/Material"

export const MATERIALS_CONFIG: Record<MaterialType, MaterialProperties> = {
  [MATERIAL.WATER]: {
    color: "#0d5388",
    isLiquid: true
  },
  [MATERIAL.SAND]: {
    color: "#eaee1dff",
    isLiquid: false
  },
  [MATERIAL.LAVA]: {
    color: "#ca0f0fff",
    isLiquid: true
  },
  [MATERIAL.SNOW]: {
    color: "#e7ddddff",
    isLiquid: false
  },
  [MATERIAL.STONE]: {
    color: "#948f8fff",
    isLiquid: false,
    isMovable: false
  }
}
