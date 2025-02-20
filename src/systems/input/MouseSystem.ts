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

  constructor(canvas: HTMLCanvasElement, entities: Entity[]) {
    this.canvas = canvas
    this.entities = entities
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
      this.addEntity(e.clientX, e.clientY)
    })
    this.canvas.addEventListener("pointerup", () => (this.isMouseDown = false))
    this.canvas.addEventListener("pointermove", (e) => {
      if (this.isMouseDown) this.addEntity(e.clientX, e.clientY)
    })
  }

  private addEntity = (x: number, y: number) => {
    const newEntity = new Entity()
    newEntity.addComponent(new PositionComponent(x, y))
    newEntity.addComponent(new RenderComponent("red"))

    this.entities.push(newEntity)
  }
}
