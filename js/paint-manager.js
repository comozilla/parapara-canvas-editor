const State = require("./state");

function PaintManager(element, drawConfig) {
  this.element = element;
  this.element.width = window.innerWidth;
  this.element.height = window.innerHeight;
  this.context = this.element.getContext("2d");
  this.drawState = new State("idling");
  this.config = drawConfig;
}

let isMouseDown = false;
let previousMousePosition;
PaintManager.prototype.mouseDownCanvas = function(event) {
  isMouseDown = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
  this.drawState.set("drawing");
};
PaintManager.prototype.mouseUpCanvas = function() {
  isMouseDown = false;
  this.drawState.set("idling");
};
PaintManager.prototype.mouseMoveCanvas = function(event) {
  if (isMouseDown) {
    if (this.config.colorPickerPanel.color === "white") {
      this.eraseByLine(
        previousMousePosition,
        { x: event.clientX, y: event.clientY },
        this.config.lineWidthPickerPanel.lineWidth
      );
    } else {
      this.drawLine(
        previousMousePosition,
        { x: event.clientX, y: event.clientY },
        this.config.colorPickerPanel.color,
        this.config.lineWidthPickerPanel.lineWidth
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
PaintManager.prototype.eraseByLine = function(startPosition, endPosition, lineWidth) {
  this.context.globalCompositeOperation = "destination-out";
  this.drawLine(startPosition, endPosition, "#000", lineWidth);
  this.context.globalCompositeOperation = "source-over";
};

PaintManager.prototype.getImage = function() {

};

PaintManager.prototype.setImage = function(image) {

};

module.exports = PaintManager;
