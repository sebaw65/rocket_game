import { DrawingSettings } from "@/data/DrawingSettings"
import { MaterialType } from "@/types/MaterialType"

export class Toolkit {
  private drawingSettings: DrawingSettings
  constructor() {
    this.drawingSettings = DrawingSettings.getInstance()
  }

  private toolkitElement: HTMLElement = document.createElement("div")

  private createMaterialSection() {
    const wrapper = document.createElement("div")
    wrapper.innerText = "Materials:"

    for (let i = 0; i < Object.keys(MaterialType).length; i++) {
      const materialBtn = document.createElement("button")
      materialBtn.innerText = Object.keys(MaterialType)[i]
      materialBtn.addEventListener("click", () =>
        this.drawingSettings.setMaterial(
          Object.keys(MaterialType)[i] as MaterialType
        )
      )

      wrapper.appendChild(materialBtn)
    }

    this.toolkitElement.appendChild(wrapper)
  }

  private createStrokeSection() {
    const wrapper = document.createElement("div")
    wrapper.innerText = "Stroke Size:"

    const strokeSize = [5, 7, 9, 20, 30]

    for (let i = 0; i < strokeSize.length; i++) {
      const size = strokeSize[i]
      const strokeBtn = document.createElement("button")
      strokeBtn.innerText = size.toString()
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
