import { Material, MaterialType } from "@/types/Material"

interface SettingsType {
  material: MaterialType
  pixelsToDraw: number
}

export class DrawingSettings {
  private static instance: DrawingSettings

  private settings: SettingsType = {
    material: Material.WATER,
    pixelsToDraw: 1
  }

  private constructor() {}

  static getInstance() {
    if (!DrawingSettings.instance) {
      DrawingSettings.instance = new DrawingSettings()
    }

    return DrawingSettings.instance
  }

  setMaterial(material: MaterialType) {
    this.settings.material = material
  }

  setStrokeWidth(pixelsToDraw: number) {
    this.settings.pixelsToDraw = pixelsToDraw
  }

  getMaterial() {
    return this.settings.material
  }

  getStrokeSize() {
    return this.settings.pixelsToDraw
  }
}
