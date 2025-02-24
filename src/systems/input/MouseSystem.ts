import { PositionComponent } from "@/components/PositionComponent"
import { RenderComponent } from "@/components/RenderComponent"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

export class MouseSystem implements System {
  private canvas: HTMLCanvasElement
  private mouseX: number = 0
  private mouseY: number = 0
  private isMouseDown: boolean = false
  private entities: Entity[] = []
  private pixelSize: number = 0

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

  public update(entities: Entity[]): void {
    if (!this.isMouseDown) return

    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)

      if (pos && this.mouseX && this.mouseY) {
        pos.x = this.mouseX
        pos.y = this.mouseY
      }
    })
  }

  private setupEventListeners() {
    this.canvas.addEventListener("pointerdown", (e) => {
      this.isMouseDown = true
      if (e.clientX % this.pixelSize === 0) {
        this.addEntity(e.clientX, e.clientY)
        return
      }

      this.addEntity(e.clientX - (e.clientX % this.pixelSize), e.clientY)
    })
    this.canvas.addEventListener("pointerup", () => (this.isMouseDown = false))
    this.canvas.addEventListener("pointermove", (e) => {
      if (!this.isMouseDown) return

      if (e.clientX % this.pixelSize === 0) {
        this.addEntity(e.clientX, e.clientY)
        return
      }

      this.addEntity(e.clientX - (e.clientX % this.pixelSize), e.clientY)
    })
  }

  private addEntity = (x: number, y: number) => {
    const newEntity = new Entity()
    newEntity.addComponent(new PositionComponent(x, y))
    newEntity.addComponent(new RenderComponent("#0d5388"))

    this.entities.push(newEntity)
  }
}
