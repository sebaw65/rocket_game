import { Entity } from "@/entities/Entity"
import { Point, PointUtils } from "@/types/Point"
import { MaterialMovementSystem } from "../MaterialMovementSystem"
import { RenderMaterial } from "@/components/material/RenderMaterial"
import { MaterialMovementContext } from "@/types/MaterialMovementContext"
import { PositionComponent } from "@/components/PositionComponent"
import { DIRECTION } from "@/types/Direction"

export class LiquidMaterialSystem extends MaterialMovementSystem {
  shouldProcess(entity: Entity): boolean {
    const material = entity.getComponent(RenderMaterial)

    return material?.isLiquid ?? false
  }

  // TODO Dodać ruch po skosie
  moveEntity(entity: Entity, ctx: MaterialMovementContext): void {
    const pos = entity.getComponent(PositionComponent)
    const material = entity.getComponent(RenderMaterial)
    if (!pos || !material) return

    const gridPos = PointUtils.getGridPosition(pos)
    const positionBelow = `${gridPos.x},${gridPos.y + ctx.fallSpeed}`

    if (this.isInsideCanvasHeight(gridPos, ctx)) return

    if (!ctx.grid.has(positionBelow)) {
      if (material) material.direction = null

      ctx.grid.delete(`${gridPos.x},${gridPos.y}`)
      ctx.grid.set(`${positionBelow}`, entity)
      this.updateEntityPositionFromGridPos(
        pos,
        PointUtils.getCanvasCoord({
          x: gridPos.x,
          y: gridPos.y + ctx.fallSpeed
        })
      )
      return
    }

    const leftPosition = gridPos.x - 1
    const rightPosition = gridPos.x + 1

    const leftKey = `${leftPosition},${gridPos.y}`
    const rightKey = `${rightPosition},${gridPos.y}`

    if (!material.direction) {
      const direction = Math.random() > 0.5 ? 1 : -1
      material.direction = direction > 0 ? DIRECTION.RIGHT : DIRECTION.LEFT
    }

    const side = material.direction === DIRECTION.RIGHT ? rightKey : leftKey

    if (
      !ctx.grid.has(side) &&
      this.isPointInsideCanvasWidthGrid(gridPos, ctx)
    ) {
      ctx.grid.delete(`${gridPos.x},${gridPos.y}`)
      ctx.grid.set(`${gridPos.x},${gridPos.y}`, entity)
      const offset = material.direction === DIRECTION.RIGHT ? 1 : -1

      this.updateEntityPositionFromGridPos(
        pos,
        PointUtils.getCanvasCoord({
          x: gridPos.x + offset,
          y: gridPos.y
        })
      )
      return
    }

    const oppositeSide =
      material.direction === DIRECTION.RIGHT ? leftKey : rightKey
    const oppositePos =
      material.direction === DIRECTION.RIGHT ? leftPosition : rightPosition

    if (
      !ctx.grid.has(oppositeSide) &&
      this.isPointInsideCanvasWidthGrid({ x: oppositePos, y: gridPos.y }, ctx)
    ) {
      material.direction =
        material.direction === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT

      ctx.grid.delete(`${gridPos.x},${gridPos.y}`)
      ctx.grid.set(`${oppositePos},${gridPos.y}`, entity)
      const offset = material.direction === DIRECTION.RIGHT ? 1 : -1

      this.updateEntityPositionFromGridPos(
        pos,
        PointUtils.getCanvasCoord({
          x: gridPos.x + offset,
          y: gridPos.y
        })
      )
      return
    }
  }

  private isInsideCanvasHeight(
    gridPos: Point,
    ctx: MaterialMovementContext
  ): boolean {
    return gridPos.y + ctx.fallSpeed > ctx.canvasGridHeight
  }

  private updateEntityPositionFromGridPos(
    position: PositionComponent,
    newPosition: Point
  ): void {
    Object.assign(position, newPosition)
  }

  private isPointInsideCanvasWidthGrid(
    pointGrid: Point,
    ctx: MaterialMovementContext
  ): boolean {
    return pointGrid.x - 1 >= 0 && pointGrid.x + 1 <= ctx.canvasGridWidth
  }
}
