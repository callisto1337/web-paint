class Canvas {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = null;
    this.mousePosition = { x: 0, y: 0 };
    this.isDrawing = false;
  }

  init() {
    if (!this.canvas.getContext) {
      console.error('Ваш браузер не поддерживает Canvas');
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.initDrawingFeature();
  }

  updateIsDrawing(newStatus) {
    this.isDrawing = newStatus;
  }

  initDrawingFeature() {
    this.canvas.addEventListener('mousedown', (event) => {
      this.ctx.lineWidth = 1;
      this.updateIsDrawing(true);
      this.mousePosition.x = event.pageX - event.target.offsetLeft;
      this.mousePosition.y = event.pageY - event.target.offsetTop;
      this.ctx.beginPath();
      this.ctx.moveTo(this.mousePosition.x, this.mousePosition.y);
    });

    this.canvas.addEventListener('mousemove', (event) => {
      if (this.isDrawing) {
        this.mousePosition.x = event.pageX - event.target.offsetLeft;
        this.mousePosition.y = event.pageY - event.target.offsetTop;
        this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
        this.ctx.stroke();
      }
    });

    this.canvas.addEventListener('mouseup', (event) => {
      this.updateIsDrawing(false);
      this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }
}

const canvas = new Canvas('canvas');

canvas.init();
