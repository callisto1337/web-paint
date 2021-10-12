import { MODE } from '../constants.js';
import { globalState } from './GlobalState.js';

export class Canvas {
  constructor({ targetId }) {
    this.canvasEl = document.getElementById(targetId);
    this.ctx = this.canvasEl.getContext('2d');
    this.mousePosition = { x: 0, y: 0 };
    this.isDrawing = false;
    this.features = {};

    this.addPencilFeature.call(this);
    this.addErasureFeature.call(this);
    this.initDefaultFeature.call(this);

    globalState.listen('mode', ({ newValue, oldValue }) => {
      this.updateCurrentFeature({ newValue, oldValue });
    });
  }

  updateIsDrawing(newStatus) {
    this.isDrawing = newStatus;
  }

  initDefaultFeature() {
    const mode = globalState.get('mode');

    document.addEventListener('mousedown', this.features[mode].mousedown);
    document.addEventListener('mousemove', this.features[mode].mousemove);
    document.addEventListener('mouseup', this.features[mode].mouseup);
  }

  updateCurrentFeature({ oldValue, newValue }) {
    document.removeEventListener(
      'mousedown',
      this.features[oldValue].mousedown
    );
    document.removeEventListener(
      'mousemove',
      this.features[oldValue].mousemove
    );
    document.removeEventListener('mouseup', this.features[oldValue].mouseup);

    document.addEventListener('mousedown', this.features[newValue].mousedown);
    document.addEventListener('mousemove', this.features[newValue].mousemove);
    document.addEventListener('mouseup', this.features[newValue].mouseup);
  }

  addPencilFeature() {
    this.features[MODE.PENCIL] = {
      mousedown: (event) => {
        this.ctx.lineWidth = 1;
        this.ctx.lineHeight = 1;
        this.ctx.strokeStyle = globalState.get('color');
        this.updateIsDrawing(true);
        this.mousePosition.x = event.pageX - event.target.offsetLeft;
        this.mousePosition.y = event.pageY - event.target.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(this.mousePosition.x, this.mousePosition.y);
      },
      mousemove: (event) => {
        if (this.isDrawing) {
          this.mousePosition.x = event.pageX - event.target.offsetLeft;
          this.mousePosition.y = event.pageY - event.target.offsetTop;
          this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
          this.ctx.stroke();
        }
      },
      mouseup: () => {
        if (globalState.get('mode') !== MODE.PENCIL) {
          return;
        }

        this.updateIsDrawing(false);
        this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
        this.ctx.stroke();
        this.ctx.closePath();
      },
    };
  }

  addErasureFeature() {
    this.features[MODE.ERASURE] = {
      mousedown: (event) => {
        this.ctx.lineWidth = 8;
        this.ctx.lineHeight = 8;
        this.ctx.strokeStyle = 'white';
        this.updateIsDrawing(true);
        this.mousePosition.x = event.pageX - event.target.offsetLeft;
        this.mousePosition.y = event.pageY - event.target.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(this.mousePosition.x, this.mousePosition.y);
      },
      mousemove: (event) => {
        if (this.isDrawing) {
          this.mousePosition.x = event.pageX - event.target.offsetLeft;
          this.mousePosition.y = event.pageY - event.target.offsetTop;
          this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
          this.ctx.stroke();
        }
      },
      mouseup: () => {
        this.updateIsDrawing(false);
        this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
        this.ctx.stroke();
        this.ctx.closePath();
      },
    };
  }
}
