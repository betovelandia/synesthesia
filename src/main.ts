import Pointer from './elements/Pointer'
import './style.css'
import { resizeCanvas } from './utils/canvas'
import * as dat from 'dat.gui'
import { guiConfig } from './config';

const startGUI = () => {
	const gui = new dat.GUI();
	gui.add(guiConfig, 'DYE_RESOLUTION', { 'high': 1024, 'medium': 512, 'low': 256, 'very low': 128 }).name('quality').onFinishChange(() => {});
	gui.add(guiConfig, 'SIM_RESOLUTION', { '32': 32, '64': 64, '128': 128, '256': 256 }).name('sim resolution').onFinishChange(() => {});
	gui.add(guiConfig, 'DENSITY_DISSIPATION', 0, 4.0).name('density diffusion');
	gui.add(guiConfig, 'VELOCITY_DISSIPATION', 0, 4.0).name('velocity diffusion');
	gui.add(guiConfig, 'PRESSURE', 0.0, 1.0).name('pressure');
	gui.add(guiConfig, 'CURL', 0, 50).name('vorticity').step(1);
	gui.add(guiConfig, 'SPLAT_RADIUS', 0.01, 1.0).name('splat radius');
	gui.add(guiConfig, 'SHADING').name('shading').onFinishChange(() => {});
	gui.add(guiConfig, 'COLORFUL').name('colorful');
	gui.add(guiConfig, 'PAUSED').name('paused').listen();
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const pointers = [new Pointer()];
resizeCanvas(canvas);
startGUI();
