import { DEFAULT_PIXEL_SIZE } from "@/config/SystemConfig"

export interface Point {
  x: number
  y: number
}

const toGrid = (v: number) => Math.floor(v / DEFAULT_PIXEL_SIZE)
const toCanvasSize = (v: number) => v * DEFAULT_PIXEL_SIZE

export const PointUtils = {
  equals(p1: Point, p2: Point): boolean {
    return p1.x === p2.x && p1.y === p2.y
  },

  getGridPosition({ x, y }: Point) {
    return {
      x: toGrid(x),
      y: toGrid(y)
    }
  },

  getCanvasCoord({ x, y }: Point) {
    return { x: toCanvasSize(x), y: toCanvasSize(y) }
  },
  toGrid,
  toCanvasSize
} as const
