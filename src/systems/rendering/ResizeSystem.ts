import { PositionComponent } from "@/components/PositionComponent"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

export class ResizeSystem implements System {
  public constructor(
    private canvasCtx: CanvasRenderingContext2D,
    private entities: Entity[]
  ) {
    this.update()

    globalThis.addEventListener("resize", () => {
      this.update()
    })

    globalThis.screen.orientation?.addEventListener("change", () =>
      this.update()
    )
  }

  private update() {
    const dpr = globalThis.devicePixelRatio || 1

    this.canvasCtx.scale(dpr, dpr)
    // Ustaw atrybuty
    this.canvasCtx.canvas.width = globalThis.innerWidth
    this.canvasCtx.canvas.height = globalThis.innerHeight

    // Ustaw style CSS
    this.canvasCtx.canvas.style.width = `${globalThis.innerWidth}px`
    this.canvasCtx.canvas.style.height = `${globalThis.innerHeight}px`

    // If we narrow canvas, we want to lift up any entities
    this.entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)

      if (pos && pos.y > this.canvasCtx.canvas.height) {
        pos.y = this.canvasCtx.canvas.height - 5
      }
    })
  }
}
