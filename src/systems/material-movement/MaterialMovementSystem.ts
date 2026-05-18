import { MaterialComponent } from "@/components/material/MaterialComponent"
import { PositionComponent } from "@/components/PositionComponent"
import { Entity } from "@/entities/Entity"
import { MaterialMovementContext } from "@/systems/material-movement/MaterialMovementContext"
import { Point, PointUtils } from "../input/Point"
import { DIRECTION } from "@/types/Direction"

export abstract class MaterialMovementSystem {
  abstract moveEntity(entity: Entity, ctx: MaterialMovementContext): void

  update(entity: Entity, ctx: MaterialMovementContext) {
    if (ctx.processedEntities.has(entity)) return
    ctx.processedEntities.add(entity)

    this.moveEntity(entity, ctx)
  }

  protected moveBellow(entity: Entity, ctx: MaterialMovementContext) {
    const pos = entity.getComponent(PositionComponent)
    const material = entity.getComponent(MaterialComponent)
    if (!pos || !material) return

    const gridPos = PointUtils.getGridPosition(pos)
    const positionBelow = `${gridPos.x},${gridPos.y + ctx.fallSpeed}`

    if (material) material.currentDirection = null

    ctx.grid.delete(`${gridPos.x},${gridPos.y}`)
    ctx.grid.set(`${positionBelow}`, entity)
    this.updateEntityPositionFromGridPos(
      pos,
      PointUtils.getCanvasCoord({
        x: gridPos.x,
        y: gridPos.y + ctx.fallSpeed
      })
    )
  }

  protected moveOnSide(entity: Entity, ctx: MaterialMovementContext) {
    const pos = entity.getComponent(PositionComponent)
    const material = entity.getComponent(MaterialComponent)
    if (!pos || !material) return

    const gridPos = PointUtils.getGridPosition(pos)

    const leftPosition = gridPos.x - 1
    const rightPosition = gridPos.x + 1

    const leftKey = `${leftPosition},${gridPos.y}`
    const rightKey = `${rightPosition},${gridPos.y}`

    if (!material.currentDirection) {
      const direction = Math.random() > 0.5 ? 1 : -1
      material.currentDirection =
        direction > 0 ? DIRECTION.RIGHT : DIRECTION.LEFT
    }

    const side =
      material.currentDirection === DIRECTION.RIGHT ? rightKey : leftKey

    if (
      !ctx.grid.has(side) &&
      this.isPointInsideCanvasWidthGrid(gridPos, ctx)
    ) {
      ctx.grid.delete(`${gridPos.x},${gridPos.y}`)
      ctx.grid.set(side, entity)
      const offset = material.currentDirection === DIRECTION.RIGHT ? 1 : -1

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

  protected moveDiagonal(entity: Entity, ctx: MaterialMovementContext) {
    const pos = entity.getComponent(PositionComponent)
    const material = entity.getComponent(MaterialComponent)
    if (!pos || !material) return

    const gridPos = PointUtils.getGridPosition(pos)

    const leftPosition = gridPos.x - 1
    const rightPosition = gridPos.x + 1
    const nextY = gridPos.y + ctx.fallSpeed

    const diagonalLeftKey = `${leftPosition},${nextY}`
    const diagonalRightKey = `${rightPosition},${nextY}`

    const leftFree = leftPosition >= 0 && !ctx.grid.has(diagonalLeftKey)
    const rightFree = rightPosition <= ctx.canvasGridWidth && !ctx.grid.has(diagonalRightKey)

    if (!leftFree && !rightFree) return

    const newPosition = leftFree ? leftPosition : rightPosition

    ctx.grid.delete(`${gridPos.x},${gridPos.y}`)
    ctx.grid.set(`${newPosition},${nextY}`, entity)

    this.updateEntityPositionFromGridPos(
      pos,
      PointUtils.getCanvasCoord({
        x: newPosition,
        y: nextY
      })
    )
  }

  protected isInsideCanvasHeight(
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
