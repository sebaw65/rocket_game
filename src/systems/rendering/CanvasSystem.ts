/**
 * Singleton class
 * Create only one canvas
 */
export class CanvasSystem {
  private static instance: CanvasSystem
  public readonly canvas: HTMLCanvasElement
  public readonly ctx: CanvasRenderingContext2D

  private constructor() {
    this.canvas = document.createElement("canvas")
    this.canvas.style.position = "fixed" // Zapobiega przesunięciom
    this.canvas.style.imageRendering = "pixelated" // Ostry pikselowy wygląd

    const ctx = this.canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas context not available")
    this.ctx = ctx
  }

  public static getInstance() {
    if (!CanvasSystem.instance) {
      CanvasSystem.instance = new CanvasSystem()
    }
    return CanvasSystem.instance
  }
}
