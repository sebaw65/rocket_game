import { PositionComponent } from "@/components/PositionComponent"
import { RenderMaterial } from "@/components/RenderMaterial"
import { DEFAULT_PIXEL_SIZE } from "@/config/SystemConfig"
import { Entity } from "@/entities/Entity"
import { DIRECTION } from "@/types/Direction"
import { Point, PointUtils } from "@/types/Point"
import { System } from "@/types/System"

export class CellularAutomataSystem implements System {
  private grid: Map<string, Entity>
  private gravityMultiplier: number = 1
  private canvasCtx: CanvasRenderingContext2D

  constructor(canvasCtx: CanvasRenderingContext2D) {
    this.grid = new Map()
    this.canvasCtx = canvasCtx
  }

  public update(entities: Entity[]): void {
    this.buildGrid(entities)
    this.applyGravity(entities)
  }

  private buildGrid(entities: Entity[]) {
    this.grid.clear()
    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)
      if (!pos) return

      const gridPos = PointUtils.getGridPosition(pos)
      if (pos) {
        this.grid.set(`${gridPos.x},${gridPos.y}`, entity)
      }
    })
  }

  //TODO Dodać ruch po skosie
  private applyGravity(entities: Entity[]) {
    const canvasHeightGrid =
      Math.floor(this.canvasCtx.canvas.height / DEFAULT_PIXEL_SIZE) - 1

    // Iterate from bottom to the top to avoid pixel skipping
    this.sortFromBottomToTop(entities)

    const fallSpeed = Math.round(1 * this.gravityMultiplier)
    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)
      if (!pos) return

      const gridPos = PointUtils.getGridPosition(pos)

      const materialProperties = entity.getComponent(RenderMaterial)
      if (materialProperties?.isMovable === false) return

      const positionBelow = `${gridPos.x},${gridPos.y + fallSpeed}`

      // don't move further than the size of canvas
      if (gridPos.y > canvasHeightGrid - fallSpeed) return

      if (!this.grid.has(positionBelow)) {
        if (materialProperties) materialProperties.direction = null

        this.grid.delete(`${gridPos.x},${gridPos.y}`)
        this.grid.set(`${positionBelow}`, entity)
        this.updateEntityPositionFromGridPos(
          pos,
          PointUtils.getCanvasCoord({
            x: gridPos.x,
            y: gridPos.y + fallSpeed
          })
        )
        return
      } else {
        if (materialProperties?.isLiquid) {
          const leftPosition = gridPos.x - 1
          const rightPosition = gridPos.x + 1

          const leftKey = `${leftPosition},${gridPos.y}`
          const rightKey = `${rightPosition},${gridPos.y}`

          if (!materialProperties.direction) {
            const direction = Math.random() > 0.5 ? 1 : -1
            materialProperties.direction =
              direction > 0 ? DIRECTION.RIGHT : DIRECTION.LEFT
          }

          const side =
            materialProperties.direction === DIRECTION.RIGHT
              ? rightKey
              : leftKey

          if (
            !this.grid.has(side) &&
            this.isPointInsideCanvasWidthGrid(gridPos)
          ) {
            this.grid.delete(`${gridPos.x},${gridPos.y}`)
            this.grid.set(`${gridPos.x},${gridPos.y}`, entity)
            const offset =
              materialProperties.direction === DIRECTION.RIGHT ? 1 : -1

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
            materialProperties.direction === DIRECTION.RIGHT
              ? leftKey
              : rightKey
          const oppositePos =
            materialProperties.direction === DIRECTION.RIGHT
              ? leftPosition
              : rightPosition

          if (
            !this.grid.has(oppositeSide) &&
            this.isPointInsideCanvasWidthGrid({ x: oppositePos, y: gridPos.y })
          ) {
            materialProperties.direction =
              materialProperties.direction === DIRECTION.LEFT
                ? DIRECTION.RIGHT
                : DIRECTION.LEFT

            this.grid.delete(`${gridPos.x},${gridPos.y}`)
            this.grid.set(`${oppositePos},${gridPos.y}`, entity)
            const offset =
              materialProperties.direction === DIRECTION.RIGHT ? 1 : -1

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
      }
    })
  }

  private isPointInsideCanvasWidthGrid(pointGrid: Point): boolean {
    const canvasWidth =
      Math.floor(this.canvasCtx.canvas.width / DEFAULT_PIXEL_SIZE) - 1

    return pointGrid.x - 1 >= 0 && pointGrid.x + 1 <= canvasWidth
  }

  private updateEntityPositionFromGridPos(
    position: PositionComponent,
    newPosition: Point
  ): void {
    Object.assign(position, newPosition)
  }

  private sortFromBottomToTop(entities: Entity[]) {
    entities.sort((a, b) => {
      const posA = a.getComponent(PositionComponent)
      const posB = b.getComponent(PositionComponent)

      return posB!.y - posA!.y
    })
  }
}
