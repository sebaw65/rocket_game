export const MaterialType = {
  WATER: "WATER",
  SAND: "SAND",
  LAVA: "LAVA",
  SNOW: "SNOW",
  STONE: "STONE"
} as const

export type MaterialType = (typeof MaterialType)[keyof typeof MaterialType]
