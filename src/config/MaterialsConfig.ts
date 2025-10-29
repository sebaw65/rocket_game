import { MaterialProperties } from "@/types/MaterialProperties"
import { MaterialType } from "@/types/MaterialType"

export const MATERIALS_CONFIG: Record<MaterialType, MaterialProperties> = {
  [MaterialType.WATER]: {
    color: "#0d5388",
    isLiquid: true
  },
  [MaterialType.SAND]: {
    color: "#eaee1dff",
    isLiquid: false
  },
  [MaterialType.LAVA]: {
    color: "#ca0f0fff",
    isLiquid: true
  },
  [MaterialType.SNOW]: {
    color: "#e7ddddff",
    isLiquid: false
  },
  [MaterialType.STONE]: {
    color: "#948f8fff",
    isLiquid: false,
    isMovable: false
  }
}
