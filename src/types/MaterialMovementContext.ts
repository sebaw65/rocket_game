import { Entity } from "@/entities/Entity"

export interface MaterialMovementContext {
  grid: Map<string, Entity>
  fallSpeed: number
  canvasGridHeight: number
  canvasGridWidth: number
}
