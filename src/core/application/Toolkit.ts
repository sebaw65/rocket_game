import { DEFAULT_PIXEL_SIZE } from "@/config/SystemConfig"
import { DrawingSettings } from "@/data/DrawingSettings"
import { MATERIAL, MaterialType } from "@/types/Material"

export class Toolkit {
  private drawingSettings: DrawingSettings
  constructor() {
    this.drawingSettings = DrawingSettings.getInstance()
  }

  private toolkitElement: HTMLElement = document.createElement("div")

  private createMaterialSection() {
    const wrapper = document.createElement("div")
    wrapper.innerText = "Materials:"

    for (let i = 0; i < Object.keys(MATERIAL).length; i++) {
      const materialBtn = document.createElement("button")
      materialBtn.innerText = Object.keys(MATERIAL)[i]
      materialBtn.addEventListener("click", () =>
        this.drawingSettings.setMaterial(
          Object.keys(MATERIAL)[i] as MaterialType
        )
      )

      wrapper.appendChild(materialBtn)
    }

    this.toolkitElement.appendChild(wrapper)
  }

  private createStrokeSection() {
    const wrapper = document.createElement("div")
    wrapper.innerText = "Stroke Size:"

    const strokeSize = [5, 10, 15, 20, 30]

    for (let i = 0; i < strokeSize.length; i++) {
      const size = strokeSize[i]
      const strokeBtn = document.createElement("button")
      strokeBtn.innerText = (size / DEFAULT_PIXEL_SIZE).toString()
      wrapper.appendChild(strokeBtn)
      strokeBtn.addEventListener("click", () =>
        this.drawingSettings.setStrokeWidth(size)
      )
    }
    this.toolkitElement.appendChild(wrapper)
  }

  public mount(root: HTMLElement) {
    this.toolkitElement.classList.add("toolkit")
    this.createMaterialSection()
    root.appendChild(this.toolkitElement)
    this.createStrokeSection()
  }
}
