export default class GameEngine {
  // Engine variables
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  // Settings
  private pixelSize = 2;
  private gridCountX = Math.floor(globalThis.innerWidth / this.pixelSize);
  private gridCountY = Math.floor(globalThis.innerHeight / this.pixelSize);
  private lastFrameTime = 0;
  private targetFPS = 120;

  // Others
  private paddingX = globalThis.innerWidth - this.pixelSize * this.gridCountX;
  private paddingY = globalThis.innerHeight - this.pixelSize * this.gridCountY;

  private selectedBoxes: number[][] = [];

  constructor() {
    let isMouseDown = false;

    this.canvas = document.createElement("canvas");

    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not support 2D!");

    this.ctx = ctx;

    // Init grid array
    for (let x = 0; x <= this.gridCountX; x++) {
      this.selectedBoxes[x] = [];
      for (let y = 0; y <= this.gridCountY; y++) {
        this.selectedBoxes[x][y] = 0;
      }
    }

    // fit size
    this.resizeCanvas();
    globalThis.addEventListener("resize", () => this.resizeCanvas());

    this.drawGrid();
    // animate
    this.animate();

    this.canvas.addEventListener("pointerdown", () => {
      isMouseDown = true;
    });
    this.canvas.addEventListener("pointerup", () => {
      isMouseDown = false;
    });
    this.canvas.addEventListener(
      "pointermove",
      (e) => isMouseDown && this.handleClick(e)
    );
    this.canvas.addEventListener("click", (e) => this.handleClick(e));
  }

  public init() {
    return this.canvas;
  }

  private drawStroke(size: number, x: number, y: number) {
    for (let xCord = 0; xCord <= this.selectedBoxes.length - 1; xCord++) {
      for (
        let yCord = 0;
        yCord <= this.selectedBoxes[xCord].length - 1;
        yCord++
      ) {
        if (xCord === x && yCord === y) {
          if (this.selectedBoxes[xCord][yCord] === 0) {
            // if (size % 2 === 0)
            for (let penX = 0; penX <= size; penX++) {
              for (let penY = 0; penY <= size; penY++) {
                this.selectedBoxes[xCord - penX][yCord - penY] = 1;
              }
            }
            // this.selectedBoxes[xCord][yCord] = 1;
            // this.selectedBoxes[xCord - 1][yCord] = 1;
            // this.selectedBoxes[xCord][yCord + 1] = 1;
            // this.selectedBoxes[xCord - 1][yCord + 1] = 1;
            continue;
          }
          this.selectedBoxes[xCord][yCord] = 0;
        }
      }
    }
  }

  private resizeCanvas() {
    this.canvas.width = globalThis.innerWidth;
    this.canvas.height = globalThis.innerHeight;
  }

  private drawGrid() {
    this.ctx.beginPath();

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 1;

    // X lines
    for (
      let i = 0;
      i <= this.gridCountX * this.pixelSize;
      i += this.pixelSize
    ) {
      this.ctx.moveTo(0.5 + i + this.paddingX / 2, this.paddingY / 2);
      this.ctx.lineTo(
        0.5 + i + this.paddingX / 2,
        this.pixelSize * this.gridCountY + this.paddingY / 2
      );
    }

    // Y lines
    for (
      let i = 0;
      i <= this.gridCountY * this.pixelSize;
      i += this.pixelSize
    ) {
      this.ctx.moveTo(this.paddingX / 2, 0.5 + i + this.paddingY / 2);
      this.ctx.lineTo(
        this.pixelSize * this.gridCountX + this.paddingX / 2,
        0.5 + i + this.paddingY / 2
      );
    }

    this.ctx.stroke();
  }

  private handleClick(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;

    const gridX = Math.floor((x - this.paddingX / 2) / this.pixelSize);
    const gridY = Math.floor((y - this.paddingY / 2) / this.pixelSize);

    if (
      gridX < 0 ||
      gridX > this.gridCountX - 1 ||
      gridY < 0 ||
      gridY > this.gridCountY - 1
    )
      return;

    this.drawStroke(10, gridX, gridY);
    // this.redrawBox(gridX, gridY);
    // for (let xCord = 0; xCord <= this.selectedBoxes.length - 1; xCord++) {
    //   for (
    //     let yCord = 0;
    //     yCord <= this.selectedBoxes[xCord].length - 1;
    //     yCord++
    //   ) {
    //     if (xCord === gridX && yCord === gridY) {
    //       if (this.selectedBoxes[xCord][yCord] === 0) {
    //         this.selectedBoxes[xCord][yCord] = 1;
    //         this.selectedBoxes[xCord - 1][yCord] = 1;
    //         this.selectedBoxes[xCord][yCord + 1] = 1;
    //         this.selectedBoxes[xCord - 1][yCord + 1] = 1;
    //         continue;
    //       }
    //       this.selectedBoxes[xCord][yCord] = 0;
    //     }
    //   }
    // }
  }

  private redrawBox(gridX: number, gridY: number) {
    const x = gridX * this.pixelSize + this.paddingX / 2 + 0.5;
    const y = gridY * this.pixelSize + this.paddingY / 2 + 0.5;

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize);
  }

  private drawBg() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Wyczyść poprzedni frame
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private animate() {
    const now = performance.now();
    const delta = now - this.lastFrameTime;

    if (delta >= 1000 / this.targetFPS) {
      this.lastFrameTime = now;

      this.drawBg();
      // this.drawGrid();

      if (!this.selectedBoxes.length) return;

      for (let x = 0; x <= this.selectedBoxes.length - 1; x++) {
        for (let y = this.selectedBoxes[x].length - 1; y >= 0; y--) {
          // zaznaczony pixel
          if (this.selectedBoxes[x][y] === 1) {
            // niżej nie może upaść
            if (y === this.gridCountY - 1) {
              this.selectedBoxes[x][y] = 1;
              this.redrawBox(x, y);
              continue;
            }

            const below = this.selectedBoxes[x][y + 1];
            const left = x > 0 ? this.selectedBoxes[x - 1][y + 1] : 1; // Sprawdź lewego sąsiada
            const right =
              x < this.gridCountX - 1 ? this.selectedBoxes[x + 1][y + 1] : 1; // Sprawdź prawego sąsiada

            // jeśli nic nie ma pod to podmień
            if (below === 0) {
              this.selectedBoxes[x][y] = 0;
              this.selectedBoxes[x][y + 1] = 1;
            }
            // Jeśli coś jest pod spodem — losowe przechylenie w bok
            else if (left === 0 && right === 0) {
              const direction = Math.random() < 0.5 ? -1 : 1;
              this.selectedBoxes[x][y] = 0;
              this.selectedBoxes[x + direction][y + 1] = 1;
            } else if (left === 0) {
              this.selectedBoxes[x][y] = 0;
              this.selectedBoxes[x - 1][y + 1] = 1;
            } else if (right === 0) {
              this.selectedBoxes[x][y] = 0;
              this.selectedBoxes[x + 1][y + 1] = 1;
            }

            this.redrawBox(x, y);
          }
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}
