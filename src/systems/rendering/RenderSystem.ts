import { PositionComponent } from "@/components/PositionComponent"
import { RenderComponent } from "@/components/RenderComponent"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

export class RenderSystem implements System {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public update(entities: Entity[], pixelSize: number): void {
    // Cleanup canvas scene
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)
      const render = entity.getComponent(RenderComponent)

      if (pos && render) {
        this.ctx.fillStyle = render.color
        this.ctx.fillRect(pos.x, pos.y, pixelSize, pixelSize)
      }
    })
  }
}
