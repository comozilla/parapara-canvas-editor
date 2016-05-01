const eventPublisher = require("./publisher");

// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
function PaintManager(element, drawConfig, framesController) {
  this.element = element;
  this.element.width = window.innerWidth;
  this.element.height = window.innerHeight;

  this.element.addEventListener("mousedown",
    event => { this.mouseDownCanvas(event); });
  this.element.addEventListener("mouseup", () => { this.mouseUpCanvas(); });
  this.element.addEventListener("mousemove",
    event => { this.mouseMoveCanvas(event); });

  this.context = this.element.getContext("2d");
  this.drawState = "idling";
  this.config = drawConfig;

  eventPublisher.subscribe(
      "currentFrameId", (nextCurrentFrame) => {
    // 今のCanvasを今のFrameに書き込む
        framesController.getCurrentFrame().imageData = this.getImageData();

    // 次のFrameをCanvasに反映させる
        let nextImageData =
      framesController.getFrameById(nextCurrentFrame).imageData;
        if (nextImageData !== null) {
      this.setImageData(nextImageData);
    }
      });
}

let isMouseDown = false;
let previousMousePosition;
PaintManager.prototype.mouseDownCanvas = function(event) {
  isMouseDown = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
  this.drawState = "drawing";
  eventPublisher.publish("drawState", "drawing");
};
PaintManager.prototype.mouseUpCanvas = function() {
  isMouseDown = false;
  this.drawState = "idling";
  eventPublisher.publish("drawState", "idling");
};
PaintManager.prototype.mouseMoveCanvas = function(event) {
  if (isMouseDown) {
    if (this.config.color === "white") {
      this.eraseByLine(
        previousMousePosition,
        { x: event.clientX, y: event.clientY },
        this.config.lineWidth
      );
    } else {
      this.drawLine(
        previousMousePosition,
        { x: event.clientX, y: event.clientY },
        this.config.color,
        this.config.lineWidth
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

PaintManager.prototype.getImageData = function() {
  return this.context.getImageData(0, 0,
    this.element.width, this.element.height);
};

PaintManager.prototype.setImageData = function(imageData) {
  this.context.clearRect(0, 0,
    this.element.width, this.element.height); // クリアする必要があるのか
  this.context.putImageData(imageData, 0, 0);
};

module.exports = PaintManager;
