import { Entity } from "@/entities/Entity"
import { PointUtils } from "@/systems/input/Point"
import { MaterialMovementSystem } from "../MaterialMovementSystem"
import { MaterialMovementContext } from "@/systems/material-movement/MaterialMovementContext"
import { PositionComponent } from "@/components/PositionComponent"
import { MaterialComponent } from "@/components/material/MaterialComponent"

export class LiquidMaterialSystem extends MaterialMovementSystem {
  moveEntity(entity: Entity, ctx: MaterialMovementContext): void {
    const pos = entity.getComponent(PositionComponent)
    const material = entity.getComponent(MaterialComponent)
    if (!pos || !material) return

    const gridPos = PointUtils.getGridPosition(pos)
    if (this.isInsideCanvasHeight(gridPos, ctx)) return

    const positionBelow = `${gridPos.x},${gridPos.y + ctx.fallSpeed}`

    if (!ctx.grid.has(positionBelow)) {
      this.moveBellow(entity, ctx)
      return
    }

    const leftPosition = gridPos.x - 1
    const rightPosition = gridPos.x + 1
    const diagonalLeftKey = `${leftPosition},${gridPos.y + ctx.fallSpeed}`
    const diagonalRightKey = `${rightPosition},${gridPos.y + ctx.fallSpeed}`

    if (
      (ctx.grid.has(positionBelow) && !ctx.grid.has(diagonalLeftKey)) ||
      !ctx.grid.has(diagonalRightKey)
    ) {
      this.moveDiagonal(entity, ctx)
      return
    }

    this.moveOnSide(entity, ctx)
  }
}
