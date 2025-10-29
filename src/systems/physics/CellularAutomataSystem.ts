import { PositionComponent } from "@/components/PositionComponent"
import { RenderMaterial } from "@/components/RenderMaterial"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

export class CellularAutomataSystem implements System {
  private grid: Map<string, Entity>
  private gravity: number = 1
  private canvasCtx: CanvasRenderingContext2D
  private pixelSize: number

  constructor(canvasCtx: CanvasRenderingContext2D, pixelSize: number) {
    this.grid = new Map()
    this.canvasCtx = canvasCtx
    this.pixelSize = pixelSize
  }

  public update(entities: Entity[]): void {
    this.buildGrid(entities)
    this.applyGravity(entities)
  }

  private buildGrid(entities: Entity[]) {
    this.grid.clear()
    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)
      if (pos) {
        this.grid.set(`${pos.x},${pos.y}`, entity)
      }
    })
  }

  private applyGravity(entities: Entity[]) {
    const canvasHeight = this.canvasCtx.canvas.height
    const canvasWidth = this.canvasCtx.canvas.width

    // Iterate from bottom to the top to avoid pixel skipping
    entities.sort((a, b) => {
      const posA = a.getComponent(PositionComponent)
      const posB = b.getComponent(PositionComponent)

      return posB!.y - posA!.y // Najpierw sprawdzamy najniżej położone piksele
    })

    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)
      const materialProperties = entity.getComponent(RenderMaterial)

      if (!pos) return
      console.log(materialProperties?.isMovable)
      if (materialProperties?.isMovable === false) return

      const below = `${pos.x},${pos.y + this.pixelSize}`
      const left = `${pos.x - this.pixelSize},${pos.y}`
      const right = `${pos.x + this.pixelSize},${pos.y}`

      // don't move further than the size of canvas
      if (pos.y >= canvasHeight - this.pixelSize) return

      // move down if nothing is below entity
      if (!this.grid.has(below)) {
        this.grid.delete(`${pos.x},${pos.y}`)
        pos.y += this.gravity
        this.grid.set(`${pos.x},${pos.y}`, entity)
      } else {
        if (materialProperties?.isLiquid) {
          const direction =
            Math.random() > 0.5 ? this.pixelSize : -this.pixelSize
          const side = direction > 0 ? right : left

          if (
            !this.grid.has(side) &&
            pos.x >= 0 &&
            pos.x <= canvasWidth - this.pixelSize
          ) {
            this.grid.delete(`${pos.x},${pos.y}`)
            pos.x += direction
            this.grid.set(`${pos.x},${pos.y}`, entity)
            return
          }
        }
      }
    })
  }
}
