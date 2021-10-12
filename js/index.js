import { Tools } from './classes/Tools.js';
import { Canvas } from './classes/Canvas.js';

class App {
  constructor() {
    new Canvas({ targetId: 'canvas' });
    new Tools();
  }
}

new App();
