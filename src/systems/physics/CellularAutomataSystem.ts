import { PositionComponent } from "@/components/PositionComponent"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

export class CellularAutomataSystem implements System {
  private grid: Map<string, Entity>
  private gravity: number = 1

  constructor() {
    this.grid = new Map()
  }

  public update(
    entities: Entity[],
    canvasHeight: number,
    canvasWidth: number,
    pixelSize: number
  ): void {
    this.buildGrid(entities) // Budujemy siatkę pozycji
    this.applyGravity(entities, canvasHeight, canvasWidth, pixelSize)
  }

  private buildGrid(entities: Entity[]) {
    this.grid.clear()
    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)
      if (pos) {
        this.grid.set(`${pos.x},${pos.y}`, entity)
      }
    })
  }

  private applyGravity(
    entities: Entity[],
    canvasHeight: number,
    canvasWidth: number,
    pixelSize: number
  ) {
    // Iterujemy od dołu do góry, by uniknąć przeskakiwania
    entities.sort((a, b) => {
      const posA = a.getComponent(PositionComponent)
      const posB = b.getComponent(PositionComponent)

      return posB!.y - posA!.y // Najpierw sprawdzamy najniżej położone piksele
    })

    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)

      if (!pos) return

      const below = `${pos.x},${pos.y + pixelSize}`
      const left = `${pos.x - pixelSize},${pos.y}`
      const right = `${pos.x + pixelSize},${pos.y}`

      // don't move further than the size of canvas
      if (pos.y >= canvasHeight - pixelSize) return

      // move down if nothing is below entity
      if (!this.grid.has(below)) {
        this.grid.delete(`${pos.x},${pos.y}`)
        pos.y += this.gravity
        this.grid.set(`${pos.x},${pos.y}`, entity)
      } else {
        const direction = Math.random() > 0.5 ? pixelSize : -pixelSize
        const side = direction > 0 ? right : left

        if (
          !this.grid.has(side) &&
          pos.x >= 0 &&
          pos.x <= canvasWidth - pixelSize
        ) {
          this.grid.delete(`${pos.x},${pos.y}`)
          pos.x += direction
          this.grid.set(`${pos.x},${pos.y}`, entity)
          return
        }
      }

      // pos.y += this.gravity
    })

    // entities.forEach((entity) => {
    //   const pos = entity.getComponent(PositionComponent)
    //   console.log(pos)
    //   if (!pos) return

    //   const belowKey = `${pos.x},${pos.y + pixelSize}`
    //   const leftKey = `${pos.x - pixelSize},${pos.y + pixelSize}`
    //   const rightKey = `${pos.x + pixelSize},${pos.y + pixelSize}`

    //   if (pos.y + pixelSize >= canvasHeight) return // Blokujemy spadanie poza ekran

    //   if (!this.grid.has(belowKey)) {
    //     // Jeśli miejsce pod pikselem jest wolne → spadamy
    //     this.grid.delete(`${pos.x},${pos.y}`)
    //     pos.y += this.gravity
    //     this.grid.set(`${pos.x},${pos.y}`, entity)
    //   } else {
    //     // Jeśli nie możemy spaść, sprawdzamy boki
    //     const direction = Math.random() > pixelSize / 2 ? 1 : -1 // Losowy ruch na boki
    //     const sideKey = direction === 1 ? rightKey : leftKey

    //     if (!this.grid.has(sideKey)) {
    //       this.grid.delete(`${pos.x},${pos.y}`)
    //       pos.x += direction
    //       pos.y += 1
    //       this.grid.set(`${pos.x},${pos.y}`, entity)
    //     }
    //   }
    // })
  }
}
