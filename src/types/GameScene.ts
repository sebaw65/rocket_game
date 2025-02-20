export abstract class GameScene {
  abstract onEnter(): void;

  abstract onUpdate(): void;

  abstract onRender(): void;

  abstract onExit(): void;
}
