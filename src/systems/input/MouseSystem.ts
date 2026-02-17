import { MaterialComponent } from "@/components/material/MaterialComponent"
import { PositionComponent } from "@/components/PositionComponent"
import { MATERIALS_CONFIG } from "@/config/MaterialsConfig"
import { DEFAULT_PIXEL_SIZE } from "@/config/SystemConfig"
import { Entity } from "@/entities/Entity"
import { Material, MaterialType } from "@/types/Material"
import { Point, PointUtils } from "@/types/Point"

export class MouseSystem {
  private canvas: HTMLCanvasElement
  private isMouseDown: boolean = false
  private entities: Entity[] = []
  private pixelsToDraw: number
  private material: MaterialType = Material.WATER

  constructor(
    canvas: HTMLCanvasElement,
    entities: Entity[],
    pixelsToDraw: number
  ) {
    this.canvas = canvas
    this.entities = entities
    this.pixelsToDraw = pixelsToDraw
    this.setupEventListeners()
  }

  public updateStrokeParams(
    pixelsToDraw: number,
    material: MaterialType
  ): void {
    this.pixelsToDraw = pixelsToDraw
    this.material = material
  }

  private setupEventListeners() {
    this.canvas.addEventListener("pointerdown", (e) => {
      this.isMouseDown = true
      this.drawPixel({ x: e.clientX, y: e.clientY })
    })
    this.canvas.addEventListener("pointerup", () => (this.isMouseDown = false))
    this.canvas.addEventListener("pointermove", (e) => {
      if (!this.isMouseDown) return

      this.drawPixel({ x: e.clientX, y: e.clientY })
    })
  }

  private drawPixel = (point: Point) => {
    const pointStrokeStartingPoint = PointUtils.getGridPosition(point)

    Array.from({ length: this.pixelsToDraw }).forEach((_, index) => {
      const pointInGrid: Point = {
        x: pointStrokeStartingPoint.x + index,
        y: pointStrokeStartingPoint.y
      }

      for (const entity of this.entities) {
        const entityPosition = entity.getComponent(PositionComponent)
        if (!entityPosition) continue
        const entityPositionInGrid: Point =
          PointUtils.getGridPosition(entityPosition)

        if (PointUtils.equals(pointInGrid, entityPositionInGrid)) {
          return
        }
      }

      if (!this.isPointInsideCanvasArea(pointInGrid)) return

      this.addEntity(PointUtils.getCanvasCoord(pointInGrid))
    })
  }

  private isPointInsideCanvasArea(point: Point) {
    const maxHeightCount =
      Math.floor(this.canvas.height / DEFAULT_PIXEL_SIZE) - 1
    const maxWidthCount = Math.floor(this.canvas.width / DEFAULT_PIXEL_SIZE) - 1

    if (point.y > maxHeightCount || point.x > maxWidthCount) return false

    return true
  }

  /**
   * Draw new pixels via cursor and attach components
   */
  private addEntity = (point: Point) => {
    const newEntity = new Entity()

    newEntity.addComponent(
      new MaterialComponent(MATERIALS_CONFIG[this.material])
    )
    newEntity.addComponent(new PositionComponent(point.x, point.y))

    this.entities.push(newEntity)
  }
}
