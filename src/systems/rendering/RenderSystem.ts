import { PositionComponent } from "@/components/PositionComponent"
import { RenderMaterial } from "@/components/RenderMaterial"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

export class RenderSystem implements System {
  private canvasCtx: CanvasRenderingContext2D
  private pixelSize: number

  constructor(canvasCtx: CanvasRenderingContext2D, pixelSize: number) {
    this.canvasCtx = canvasCtx
    this.pixelSize = pixelSize
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
      const render = entity.getComponent(RenderMaterial)

      if (pos && render) {
        this.canvasCtx.fillStyle = render.color
        this.canvasCtx.fillRect(pos.x, pos.y, this.pixelSize, this.pixelSize)
      }
    })
  }
}
