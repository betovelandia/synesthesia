import Pointer from './elements/Pointer'
import './style.css'
import { resizeCanvas } from './utils/canvas'

const startGUI = () => {
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const pointers = [new Pointer()];
resizeCanvas(canvas);
startGUI();
