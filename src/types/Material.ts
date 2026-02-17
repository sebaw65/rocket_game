export const Material = {
  WATER: "WATER",
  SAND: "SAND",
  LAVA: "LAVA",
  SNOW: "SNOW",
  STONE: "STONE"
} as const

export type MaterialType = (typeof Material)[keyof typeof Material]
