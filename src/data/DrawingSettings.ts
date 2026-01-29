import { material, MaterialType } from "@/types/MaterialType"

interface SettingsType {
  material: MaterialType
  stronkeSize: number
}

export class DrawingSettings {
  private static instance: DrawingSettings

  private settings: SettingsType = {
    material: material.WATER,
    stronkeSize: 5
  }

  private constructor() {}

  static getInstance() {
    if (!DrawingSettings.instance) {
      DrawingSettings.instance = new DrawingSettings()
    }

    return DrawingSettings.instance
  }

  setMaterial(material: MaterialType) {
    console.log(material)
    this.settings.material = material
  }

  setStrokeWidth(size: number) {
    console.log(size)
    this.settings.stronkeSize = size
  }

  getMaterial() {
    return this.settings.material
  }

  getStrokeSize() {
    return this.settings.stronkeSize
  }
}
