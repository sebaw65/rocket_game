import { PositionComponent } from "@/components/PositionComponent"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

interface GravitySystemConfig {
  gravity: number
}

export class GravitySystem implements System {
  private gravity: number = 1

  constructor({ gravity }: GravitySystemConfig) {
    this.gravity = gravity
  }

  public update(entities: Entity[], groundYPosition: number): void {
    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)

      if (pos && pos.y < groundYPosition) {
        pos.y += this.gravity
      }
    })
  }
}
