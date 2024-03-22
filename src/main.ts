import './style.css';
import { scaleByPixelRatio } from './utils/ratio';
import Pointer from './elements/Pointer';

const canvas = document.getElementsByTagName('canvas')[0];
resizeCanvas(canvas);

function resizeCanvas(canvas: HTMLCanvasElement) {
  let width = scaleByPixelRatio(canvas.clientWidth);
  let height = scaleByPixelRatio(canvas.clientHeight);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

const test = new Pointer();