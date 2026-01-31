export const MATERIAL = {
  WATER: "WATER",
  SAND: "SAND",
  LAVA: "LAVA",
  SNOW: "SNOW",
  STONE: "STONE"
} as const

export type MaterialType = (typeof MATERIAL)[keyof typeof MATERIAL]
