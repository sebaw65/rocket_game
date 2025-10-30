import { MaterialComponent } from "@/components/MaterialComponent"
import { PositionComponent } from "@/components/PositionComponent"
import { RenderMaterial } from "@/components/RenderMaterial"
import { DEFAULT_PIXEL_SIZE } from "@/config/SystemConfig"
import { Entity } from "@/entities/Entity"
import { MaterialType } from "@/types/MaterialType"
import { Point } from "@/types/Point"

export class MouseSystem {
  private canvas: HTMLCanvasElement
  private isMouseDown: boolean = false
  private entities: Entity[] = []
  private pixelSize: number
  private material: MaterialType = MaterialType.WATER

  constructor(
    canvas: HTMLCanvasElement,
    entities: Entity[],
    pixelSize: number
  ) {
    this.canvas = canvas
    this.entities = entities
    this.pixelSize = pixelSize
    this.setupEventListeners()
  }

  public updateStrokeParams(pixelSize: number, material: MaterialType): void {
    this.pixelSize = pixelSize
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
    if (
      point.x % DEFAULT_PIXEL_SIZE === 0 &&
      point.y % DEFAULT_PIXEL_SIZE === 0
    ) {
      this.addEntity(point)
      return
    }

    this.addEntity({
      x: point.x - (point.x % DEFAULT_PIXEL_SIZE),
      y: point.y - (point.y % DEFAULT_PIXEL_SIZE)
    })
  }

  private addEntity = (point: Point) => {
    let entities: Entity[] = []

    if (this.pixelSize === DEFAULT_PIXEL_SIZE) {
      const newEntity = new Entity()
      const materialComponent = new MaterialComponent(this.material)
      newEntity.addComponent(
        new RenderMaterial(
          materialComponent.getColor(),
          materialComponent.isLiquid(),
          materialComponent.isMovable()
        )
      )
      newEntity.addComponent(new PositionComponent(point.x, point.y))
      entities.push(newEntity)
    } else {
      const count = this.pixelSize / DEFAULT_PIXEL_SIZE
      for (let i = 0; i < count; i++) {
        const newEntity = new Entity()
        const materialComponent = new MaterialComponent(this.material)
        newEntity.addComponent(
          new RenderMaterial(
            materialComponent.getColor(),
            materialComponent.isLiquid(),
            materialComponent.isMovable()
          )
        )
        const newXPosition = point.x + i * DEFAULT_PIXEL_SIZE
        newEntity.addComponent(new PositionComponent(newXPosition, point.y))
        entities.push(newEntity)
      }
    }

    this.entities.push(...entities)
  }
}
