import { Entity } from "@/entities/Entity"
import { MouseSystem } from "@/systems/input/MouseSystem"
import { CellularAutomataSystem } from "@/systems/physics/CellularAutomataSystem"
import { GravitySystem } from "@/systems/physics/GravitySystem"
import { CanvasSystem } from "@/systems/rendering/CanvasSystem"
import { RenderSystem } from "@/systems/rendering/RenderSystem"
import { ResizeSystem } from "@/systems/rendering/ResizeSystem"
// import { GameplayScene } from "@/scenes/GameplayScene";
// import { SceneManager } from "@/scenes/SceneManager";

export class GameApplication {
  // Settings------------------------
  private lastFrame = 0
  private targetFPS = 120
  // Systems ------------------------
  private readonly canvasSystem = CanvasSystem.getInstance()
  private mouseSystem: MouseSystem | null = null
  private renderSystem: RenderSystem | null = null
  private entities: Entity[] = []
  private gravitySystem: GravitySystem | null = null
  private cellularAutomataSystem: CellularAutomataSystem | null = null
  // private sceneManager = new SceneManager();

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
    new ResizeSystem().initialize(this.canvasSystem.canvas, this.entities)
    this.renderSystem = new RenderSystem(this.canvasSystem.ctx)
    this.mouseSystem = new MouseSystem(this.canvasSystem.canvas, this.entities)
    this.gravitySystem = new GravitySystem({
      gravity: 1
    })
    this.cellularAutomataSystem = new CellularAutomataSystem()

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

    // const player = new Entity()
    // player.addComponent(new PositionComponent(50, 50))
    // player.addComponent(new RenderComponent("red"))
    // this.entities.push(player)

    // const gameplayScene = new GameplayScene(this.canvasSystem.canvas);
    // this.sceneManager.addScene("gameplay", gameplayScene);
    // this.sceneManager.goToScene("gameplay");
  }

  private gameLoop() {
    const loop = (timestamp: number) => {
      const delta = timestamp - this.lastFrame

      // fps control
      if (delta >= 1000 / this.targetFPS) {
        this.mouseSystem?.update(this.entities)
        this.lastFrame = timestamp
        this.renderSystem?.update(this.entities)
        this.gravitySystem?.update(
          this.entities,
          this.canvasSystem.canvas.height - 5
        )
        this.cellularAutomataSystem?.update(
          this.entities,
          this.canvasSystem.canvas.height
        )
        // this.sceneManager.update();
      }

      // this.sceneManager.render();
      requestAnimationFrame(loop)
    }

    // Pierwsze wywołanie
    requestAnimationFrame(loop)
  }

  public mount(root: HTMLElement) {
    root.appendChild(this.canvasSystem.canvas)
  }
}
