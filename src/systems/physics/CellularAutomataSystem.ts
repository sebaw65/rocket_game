import { PositionComponent } from "@/components/PositionComponent"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

export class CellularAutomataSystem implements System {
  private grid: Map<string, Entity>

  constructor() {
    this.grid = new Map()
  }

  public update(entities: Entity[], canvasHeight: number): void {
    this.buildGrid(entities) // Budujemy siatkę pozycji
    this.applyGravity(entities, canvasHeight)
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

  private applyGravity(entities: Entity[], canvasHeight: number) {
    // Iterujemy od dołu do góry, by uniknąć przeskakiwania
    entities.sort((a, b) => {
      const posA = a.getComponent(PositionComponent)
      const posB = b.getComponent(PositionComponent)
      return posB!.y - posA!.y // Najpierw sprawdzamy najniżej położone piksele
    })

    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)
      if (!pos) return

      const belowKey = `${pos.x},${pos.y + 1}`
      const leftKey = `${pos.x - 1},${pos.y + 1}`
      const rightKey = `${pos.x + 1},${pos.y + 1}`

      if (pos.y + 1 >= canvasHeight) return // Blokujemy spadanie poza ekran

      if (!this.grid.has(belowKey)) {
        // Jeśli miejsce pod pikselem jest wolne → spadamy
        this.grid.delete(`${pos.x},${pos.y}`)
        pos.y += 1
        this.grid.set(`${pos.x},${pos.y}`, entity)
      } else {
        // Jeśli nie możemy spaść, sprawdzamy boki
        const direction = Math.random() > 0.5 ? 1 : -1 // Losowy ruch na boki
        const sideKey = direction === 1 ? rightKey : leftKey

        if (!this.grid.has(sideKey)) {
          this.grid.delete(`${pos.x},${pos.y}`)
          pos.x += direction
          pos.y += 1
          this.grid.set(`${pos.x},${pos.y}`, entity)
        }
      }
    })
  }
}
