import { PositionComponent } from "@/components/PositionComponent"
import { MaterialComponent } from "@/components/material/MaterialComponent"
import { DEFAULT_PIXEL_SIZE } from "@/config/SystemConfig"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

export class RenderSystem implements System {
  private canvasCtx: CanvasRenderingContext2D

  constructor(canvasCtx: CanvasRenderingContext2D) {
    this.canvasCtx = canvasCtx
  }

  public update(entities: Entity[]): void {
    // Cleanup canvas scene
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasCtx.canvas.width,
      this.canvasCtx.canvas.height
    )

    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)
      const render = entity.getComponent(MaterialComponent)

      if (pos && render) {
        this.canvasCtx.fillStyle = render.color
        this.canvasCtx.fillRect(
          pos.x,
          pos.y,
          DEFAULT_PIXEL_SIZE,
          DEFAULT_PIXEL_SIZE
        )
      }
    })
  }
}
