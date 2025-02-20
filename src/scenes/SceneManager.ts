import { GameScene } from "@/types/GameScene";

export class SceneManager {
  private scenes: Map<string, GameScene> = new Map();
  private currentScene: GameScene | null = null;

  public addScene(name: string, scene: GameScene) {
    this.scenes.set(name, scene);
  }

  public goToScene(name: string) {
    const scene = this.scenes.get(name);
    if (!scene) return;

    // Turn off actual scene and replace it with new one
    this.currentScene?.onExit();
    this.currentScene = scene;
    this.currentScene.onEnter();
  }

  public update() {
    this.currentScene?.onUpdate();
  }

  public render() {
    this.currentScene?.onRender();
  }
}
