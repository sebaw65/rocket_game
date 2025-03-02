import { Entity } from "@/entities/Entity"
import { MouseSystem } from "@/systems/input/MouseSystem"
import { CellularAutomataSystem } from "@/systems/physics/CellularAutomataSystem"
import { CanvasSystem } from "@/systems/rendering/CanvasSystem"
import { RenderSystem } from "@/systems/rendering/RenderSystem"
import { ResizeSystem } from "@/systems/rendering/ResizeSystem"

export class GameApplication {
  private lastFrame = 0
  // Settings------------------------
  private targetFPS = 120
  private pixelSize = 20
  // Systems ------------------------
  private readonly canvasSystem = CanvasSystem.getInstance()
  private mouseSystem: MouseSystem | null = null
  private renderSystem: RenderSystem | null = null
  private entities: Entity[] = []
  private cellularAutomataSystem: CellularAutomataSystem | null = null

  constructor() {
    // init systems
    this.bootstrapSystems()
    // init gameloop
    this.gameLoop()
  }

  // Przygotowanie infrastruktury gry
  // Wywoływany jest raz przy starcie aplikacji
  private bootstrapSystems() {
    // implement systems
    new ResizeSystem(this.canvasSystem.ctx, this.entities)
    this.renderSystem = new RenderSystem(this.canvasSystem.ctx, this.pixelSize)
    this.mouseSystem = new MouseSystem(
      this.canvasSystem.canvas,
      this.entities,
      this.pixelSize
    )
    this.cellularAutomataSystem = new CellularAutomataSystem(
      this.canvasSystem.ctx,
      this.pixelSize
    )

    // Set bg color
    this.canvasSystem.ctx.clearRect(
      0,
      0,
      this.canvasSystem.canvas.width,
      this.canvasSystem.canvas.height
    )
    this.canvasSystem.ctx.fillStyle = "black"
    this.canvasSystem.ctx.fillRect(
      0,
      0,
      this.canvasSystem.canvas.width,
      this.canvasSystem.canvas.height
    )
  }

  private gameLoop() {
    const loop = (timestamp: number) => {
      const delta = timestamp - this.lastFrame

      // fps control
      if (delta >= 1000 / this.targetFPS) {
        this.mouseSystem?.update(this.entities)
        this.lastFrame = timestamp
        this.renderSystem?.update(this.entities)
        this.cellularAutomataSystem?.update(this.entities)
      }

      requestAnimationFrame(loop)
    }

    // Pierwsze wywołanie
    requestAnimationFrame(loop)
  }

  public mount(root: HTMLElement) {
    root.appendChild(this.canvasSystem.canvas)
  }
}
