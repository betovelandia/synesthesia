import Pointer from './elements/Pointer'
import './style.css'
import { getWebGLContext } from './utils/browser';
import { resizeCanvas, createTextureAsync } from './utils/canvas'

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const pointers = [new Pointer()];
const { gl, ext} = getWebGLContext(canvas);
resizeCanvas(canvas);

createTextureAsync('LDR_LLL1_0.png');
