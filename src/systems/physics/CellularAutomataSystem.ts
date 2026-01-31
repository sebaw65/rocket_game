import { PositionComponent } from "@/components/PositionComponent"
import { RenderMaterial } from "@/components/RenderMaterial"
import { DEFAULT_PIXEL_SIZE } from "@/config/SystemConfig"
import { Entity } from "@/entities/Entity"
import { DIRECTION, DirectionType } from "@/types/Direction"
import { System } from "@/types/System"

export class CellularAutomataSystem implements System {
  private grid: Map<string, Entity>
  private gravity: number = 1
  private canvasCtx: CanvasRenderingContext2D
  private direction: DirectionType | null = null

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
      if (pos) {
        this.grid.set(`${pos.x},${pos.y}`, entity)
      }
    })
  }

  private applyGravity(entities: Entity[]) {
    const canvasHeight = this.canvasCtx.canvas.height
    const canvasWidth = this.canvasCtx.canvas.width

    // Iterate from bottom to the top to avoid pixel skipping
    this.sortFromBottomToTop(entities)

    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)
      if (!pos) return

      const materialProperties = entity.getComponent(RenderMaterial)
      // stałe bloki, mają wyłączone ruszanie
      if (materialProperties?.isMovable === false) return

      const below = `${pos.x},${pos.y + DEFAULT_PIXEL_SIZE}`

      // console.log(pos.y, canvasHeight - this.pixelSize)
      // don't move further than the size of canvas
      if (pos.y >= canvasHeight - DEFAULT_PIXEL_SIZE) return

      // move down if nothing is below entity
      if (!this.grid.has(below)) {
        this.grid.delete(`${pos.x},${pos.y}`)
        pos.y += this.gravity
        this.grid.set(`${pos.x},${pos.y}`, entity)
      } else {
        if (materialProperties?.isLiquid) {
          const left = `${pos.x - DEFAULT_PIXEL_SIZE},${pos.y}`
          const right = `${pos.x + DEFAULT_PIXEL_SIZE},${pos.y}`

          // const entityDirection = materialProperties.direction

          // console.log(entityDirection)
          // TODO Losowanie tylko przy opadnięciu piętro w dół. W innym przypadku trzymaj kierunek
          const direction =
            Math.random() > 0.5 ? DEFAULT_PIXEL_SIZE : -DEFAULT_PIXEL_SIZE

          this.direction = direction > 0 ? DIRECTION.RIGHT : DIRECTION.LEFT

          let side
          if (this.direction) side = this.direction
          // console.log("direction", this.direction)
          side = this.direction === DIRECTION.RIGHT ? right : left

          // console.log("has side", this.grid.has(side))
          // console.log("side", side)
          if (
            !this.grid.has(side) &&
            pos.x >= 0 &&
            pos.x <= canvasWidth - DEFAULT_PIXEL_SIZE
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

  private sortFromBottomToTop(entities: Entity[]) {
    entities.sort((a, b) => {
      const posA = a.getComponent(PositionComponent)
      const posB = b.getComponent(PositionComponent)

      return posB!.y - posA!.y
    })
  }
}
