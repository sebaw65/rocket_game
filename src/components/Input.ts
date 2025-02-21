export class MouseState {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public buttons: Set<number> = new Set(),
    public deltaX: number = 0,
    public deltaY: number = 0
  ) {}
}
