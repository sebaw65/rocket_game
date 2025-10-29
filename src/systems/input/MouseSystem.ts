import { MaterialComponent } from "@/components/MaterialComponent"
import { PositionComponent } from "@/components/PositionComponent"
import { RenderMaterial } from "@/components/RenderMaterial"
import { DEFAULT_PIXEL_SIZE } from "@/config/SystemConfig"
import { Entity } from "@/entities/Entity"
import { MaterialType } from "@/types/MaterialType"
import { Point } from "@/types/Point"
import { System } from "@/types/System"

export class MouseSystem {
  private canvas: HTMLCanvasElement
  private mouseX: number = 0
  private mouseY: number = 0
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

  public update(pixelSize: number, material: MaterialType): void {
    this.pixelSize = pixelSize
    this.material = material
    // if (!this.isMouseDown) return
    // entities.forEach((entity) => {
    //   const pos = entity.getComponent(PositionComponent)
    //   if (pos && this.mouseX && this.mouseY) {
    //     pos.x = this.mouseX
    //     pos.y = this.mouseY
    //   }
    // })
  }

  private setupEventListeners() {
    this.canvas.addEventListener("pointerdown", (e) => {
      this.isMouseDown = true
      if (e.clientX % this.pixelSize === 0) {
        this.addEntity({ x: e.clientX, y: e.clientY })
        return
      }

      this.addEntity({
        x: e.clientX - (e.clientX % this.pixelSize),
        y: e.clientY
      })
    })
    this.canvas.addEventListener("pointerup", () => (this.isMouseDown = false))
    this.canvas.addEventListener("pointermove", (e) => {
      if (!this.isMouseDown) return

      if (e.clientX % this.pixelSize === 0) {
        this.addEntity({ x: e.clientX, y: e.clientY })
        return
      }

      this.addEntity({
        x: e.clientX - (e.clientX % this.pixelSize),
        y: e.clientY
      })
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
    console.log(entities)

    this.entities.push(...entities)
  }
}
