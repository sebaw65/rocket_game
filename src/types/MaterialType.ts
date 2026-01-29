export const material = {
  WATER: "WATER",
  SAND: "SAND",
  LAVA: "LAVA",
  SNOW: "SNOW",
  STONE: "STONE"
} as const

export type MaterialType = (typeof material)[keyof typeof material]
