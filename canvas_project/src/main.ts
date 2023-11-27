import { Dot } from './Dot.ts'

const canvas = <HTMLCanvasElement> document.getElementById("canvas");

const dot1 = new Dot(10, 10, 10, 10, canvas)

setInterval(dot1.move, 100)