export class Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(x: number, y: number, vx: number, vy: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
  public drawDot(ctx : CanvasRenderingContext2D) {
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#6aa84f";
    ctx.fill();
  }
}

