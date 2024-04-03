import { scaleByPixelRatio } from './ratio';

export const resizeCanvas = (canvas: HTMLCanvasElement) => {
  const width = scaleByPixelRatio(canvas.clientWidth);
  const height = scaleByPixelRatio(canvas.clientHeight);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}