import { MaterialType } from "@/components/material/MaterialType"
import { LiquidMaterialSystem } from "@/systems/material-movement/material-type/LiquidMaterialSystem"
import { StaticMaterialSystem } from "@/systems/material-movement/material-type/StaticMaterialSystem"
import { LooseMaterialSystem } from "@/systems/material-movement/material-type/LooseMaterialSystem"
import { MaterialComponent } from "./MaterialComponent"

export const MaterialsConfig: Record<
  MaterialType,
  Omit<MaterialComponent, "sleeping" | "currentDirection"> &
    Partial<Pick<MaterialComponent, "sleeping" | "currentDirection">>
> = {
  [MaterialType.WATER]: {
    color: "#0d5388",
    movementSystem: new LiquidMaterialSystem()
  },
  [MaterialType.SAND]: {
    color: "#eaee1dff",
    movementSystem: new LooseMaterialSystem()
  },
  [MaterialType.LAVA]: {
    color: "#ca0f0fff",
    movementSystem: new LiquidMaterialSystem()
  },
  [MaterialType.SNOW]: {
    color: "#e7ddddff",
    movementSystem: new LooseMaterialSystem()
  },
  [MaterialType.STONE]: {
    color: "#948f8fff",
    movementSystem: new StaticMaterialSystem()
  }
} as const
