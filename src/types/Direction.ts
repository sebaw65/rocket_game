export const DIRECTION = {
  LEFT: -1,
  RIGHT: 1
} as const

export type DirectionType = (typeof DIRECTION)[keyof typeof DIRECTION]
