import { GameScene } from "@/types/GameScene"

// TODO Implement scene changing system- main menu, gamescreen, etc
export class GameplayScene implements GameScene {
  private systems: GameScene[] = []

  public constructor(private canvas: HTMLCanvasElement) {}

  onEnter(): void {
    console.log("Game started!")
  }
  onExit(): void {
    console.log("Game exit!")
  }
  onRender(): void {
    // console.log("render!");
  }
  onUpdate(): void {
    // console.log("updated!");
  }
}
