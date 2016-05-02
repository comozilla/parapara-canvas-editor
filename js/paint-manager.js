const eventPublisher = require("./publisher");

// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
function PaintManager(element) {
  this.element = element;
  this.element.width = window.innerWidth;
  this.element.height = window.innerHeight;

  this.element.addEventListener("mousedown",
    event => { this.mouseDownCanvas(event); });
  this.element.addEventListener("mouseup", () => { this.mouseUpCanvas(); });
  this.element.addEventListener("mousemove",
    event => { this.mouseMoveCanvas(event); });

  this.context = this.element.getContext("2d");

  this.color = "";
  eventPublisher.subscribe("color", (color) => {
    this.color = color;
  });

  this.lineWidth = 0;
  eventPublisher.subscribe("lineWidth", (lineWidth) => {
    this.lineWidth = lineWidth;
  });
}

let isMouseDown = false;
let previousMousePosition;
PaintManager.prototype.mouseDownCanvas = function(event) {
  isMouseDown = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
  eventPublisher.publish("drawState", "drawing");
};
PaintManager.prototype.mouseUpCanvas = function() {
  isMouseDown = false;
  eventPublisher.publish("drawState", "idling");
};
PaintManager.prototype.mouseMoveCanvas = function(event) {
  if (isMouseDown) {
    if (this.color === "white") {
      this.eraseByLine(
        previousMousePosition,
        { x: event.clientX, y: event.clientY },
        this.lineWidth
      );
    } else {
      this.drawLine(
        previousMousePosition,
        { x: event.clientX, y: event.clientY },
        this.color,
        this.lineWidth
      );
    }
    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
};

/**
 * 線を描きます。
 */
PaintManager.prototype.drawLine = function(
    startPosition,
    endPosition,
    strokeColor,
    lineWidth) {

  this.context.strokeStyle = strokeColor;
  this.context.lineWidth = lineWidth;
  this.context.beginPath();
  this.context.moveTo(startPosition.x, startPosition.y);
  this.context.lineTo(endPosition.x, endPosition.y);
  this.context.lineCap = "round";
  this.context.stroke();
};

/**
 * 線で消します。消した部分は透明になります。
 */
PaintManager.prototype.eraseByLine = function(
    startPosition,
    endPosition,
    lineWidth) {
  this.context.globalCompositeOperation = "destination-out";
  this.drawLine(startPosition, endPosition, "#000", lineWidth);
  this.context.globalCompositeOperation = "source-over";
};

module.exports = PaintManager;
