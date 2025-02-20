import { PositionComponent } from "@/components/PositionComponent"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

export class ResizeSystem implements System {
  initialize(canvas: HTMLCanvasElement, entities: Entity[]) {
    this.update(canvas, entities)

    globalThis.addEventListener("resize", () => {
      this.update(canvas, entities)
    })

    globalThis.screen.orientation?.addEventListener("change", () =>
      this.update(canvas, entities)
    )
  }

  private update(canvas: HTMLCanvasElement, entities: Entity[]) {
    const dpr = globalThis.devicePixelRatio || 1

    // Ustaw atrybuty
    canvas.width = globalThis.innerWidth * dpr
    canvas.height = globalThis.innerHeight * dpr

    // Ustaw style CSS
    canvas.style.width = `${globalThis.innerWidth}px`
    canvas.style.height = `${globalThis.innerHeight}px`

    // If we narrow canvas, we want to lift up any entities
    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)

      if (pos && pos.y > canvas.height) {
        pos.y = canvas.height - 5
      }
    })

    // Dostosuj kontekst
    const ctx = canvas.getContext("2d")
    ctx?.scale(dpr, dpr)
  }
}
