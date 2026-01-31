export interface Point {
  x: number
  y: number
}

export namespace PointUtils {
  export function equals(p1: Point, p2: Point): boolean {
    return p1.x === p2.x && p1.y === p2.y
  }
}
