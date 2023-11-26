import { Dot } from './Dot.ts'

const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const ctx = canvas.getContext("2d")!;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const dot1 = new Dot(10, 10, 10, 10)
console.log(dot1)
dot1.drawDot(ctx);