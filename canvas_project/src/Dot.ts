export class Dot {
  x: number
  y: number
  vx: number
  vy: number
  canvas: HTMLCanvasElement

  constructor(x: number, y: number, vx: number, vy: number, canvas: HTMLCanvasElement) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.canvas = canvas;
  }
  public drawDot() {
    const ctx = this.canvas.getContext("2d")!
    ctx.beginPath()
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false)
    ctx.fillStyle = heightToRgb(this.y, 0, this.canvas.height)
    ctx.closePath()
    ctx.fill()
  }

  public move = () => {
    const ctx = this.canvas.getContext("2d")!;
    ctx.clearRect(this.x - 2 - 1, this.y - 2 - 1, 2 * 2 + 2, 2 * 2 + 2)
    this.x += this.vx
    this.y += this.vy
    this.vy += 1

    hitWall(this)
    updateHtml(this)

    this.drawDot()
  }
}

function heightToRgb(height: number, minHeight: number, maxHeight: number) {
  // Normalize the height to a value between 0 and 1
  let normalizedHeight = (height - minHeight) / (maxHeight - minHeight);

  // Convert the normalized height to a color in the HSV color space
  // (Hue, Saturation, Value), then convert that color to the RGB color space
  // Note: In the HSV color space, red is at 0, green is at 1/3, and blue is at 2/3
  let hue = normalizedHeight / 3.0;
  let saturation = 1.0;
  let value = 1.0;

  let i = Math.floor(hue * 6);
  let f = hue * 6 - i;
  let p = value * (1 - saturation);
  let q = value * (1 - f * saturation);
  let t = value * (1 - (1 - f) * saturation);

  let r, g, b;
  switch (i % 6) {
      case 0: r = value, g = t, b = p; break;
      case 1: r = q, g = value, b = p; break;
      case 2: r = p, g = value, b = t; break;
      case 3: r = p, g = q, b = value; break;
      case 4: r = t, g = p, b = value; break;
      case 5: r = value, g = p, b = q; break;
  }

  // Convert the RGB values from the range [0, 1] to the range [0, 255]
  r = Math.round(r! * 255);
  g = Math.round(g! * 255);
  b = Math.round(b!* 255);

  return `rgb(${r}, ${g}, ${b})`;
}

function updateHtml(dot : Dot) {
  const xDiv = document.getElementById("xDiv")
  xDiv!.innerHTML = `x: ${dot.x.toString()}`
  const yDiv = document.getElementById("yDiv")
  yDiv!.innerHTML = `y: ${dot.y.toString()}`
  const vxDiv = document.getElementById("vxDiv")
  vxDiv!.innerHTML = `vx: ${dot.vx.toString()}`
  const vyDiv = document.getElementById("vyDiv")
  vyDiv!.innerHTML = `vy : ${dot.vy.toString()}`
}

function hitWall(dot: Dot) {
  if(dot.x <= 0) {
    dot.x = 0
    dot.vx = -dot.vx
  }
  if (dot.x >= dot.canvas.width) {
    dot.x = dot.canvas.width
    dot.vx = -dot.vx
  }
  if(dot.y <= 0) {
    dot.y = 0
    dot.vy = -dot.vy
  }
  if (dot.y >= dot.canvas.height) {
    dot.y = dot.canvas.height
    dot.vy = -dot.vy
  }
}