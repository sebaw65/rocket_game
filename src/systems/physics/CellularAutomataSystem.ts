import { PositionComponent } from "@/components/PositionComponent"
import { DEFAULT_PIXEL_SIZE } from "@/config/SystemConfig"
import { Entity } from "@/entities/Entity"
import { PointUtils } from "@/systems/input/Point"
import { System } from "@/types/System"
import { MaterialMovementContext } from "@/systems/material-movement/MaterialMovementContext"
import { MaterialComponent } from "@/components/material/MaterialComponent"

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

  //TODO Dodać sprawdzanie czy pixel jest już w danym miejscu
  //BUG Puste przestrzenie nakładają się na siebie co daje złudzenie duplikowania pikseli
  private applyGravity(entities: Entity[]) {
    // Iterate from bottom to the top to avoid pixel skipping
    this.sortFromBottomToTop(entities)

    const context = this.createContext()
    context.processedEntities.clear()

    entities.forEach((entity) => {
      const materialProperties = entity.getComponent(MaterialComponent)

      materialProperties?.movementSystem.update(entity, context)
    })
  }

  private createContext(): MaterialMovementContext {
    return {
      grid: this.grid,
      fallSpeed: Math.round(1 * this.gravityMultiplier),
      canvasGridHeight:
        Math.floor(this.canvasCtx.canvas.height / DEFAULT_PIXEL_SIZE) - 1,
      canvasGridWidth:
        Math.floor(this.canvasCtx.canvas.width / DEFAULT_PIXEL_SIZE) - 1,
      processedEntities: new Set()
    }
  }

  private sortFromBottomToTop(entities: Entity[]) {
    entities.sort((a, b) => {
      const posA = a.getComponent(PositionComponent)
      const posB = b.getComponent(PositionComponent)

      return posB!.y - posA!.y
    })
  }
}
