import { PositionComponent } from "@/components/PositionComponent"
import { Entity } from "@/entities/Entity"
import { System } from "@/types/System"

interface GravitySystemConfig {
  gravity: number
  groundYPosition: number
}

export class GravitySystem implements System {
  private gravity: number = 1
  private groundYPosition: number

  constructor({ gravity, groundYPosition }: GravitySystemConfig) {
    this.gravity = gravity
    this.groundYPosition = groundYPosition
  }

  public update(entities: Entity[]): void {
    entities.forEach((entity) => {
      const pos = entity.getComponent(PositionComponent)

      if (pos && pos.y < this.groundYPosition) {
        pos.y += this.gravity
      }
    })
  }
}
