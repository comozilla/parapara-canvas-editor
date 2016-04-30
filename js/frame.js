import stateList from "./state-list";

// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
function Frame(canvasId, config) {
  const canvasElem = document.createElement("canvas");

  canvasElem.width = window.innerWidth;
  canvasElem.height = window.innerHeight;
  canvasElem.id = "canvas" + canvasId;
  canvasElem.addEventListener("mousedown",
    event => { this.mouseDownCanvas(event); });
  canvasElem.addEventListener("mouseup", () => { this.mouseUpCanvas(); });
  canvasElem.addEventListener("mousemove",
    event => { this.mouseMoveCanvas(event); });
  // + リスナー（mouseMoveなど）
  this.canvasElement = canvasElem;
  // private メンバにしたいけど・・
  this.canvasContext = this.canvasElement.getContext("2d");
  this.thumbnail = null;
  this.config = config;
}

let isMouseDown = false;
let previousMousePosition;
Frame.prototype.mouseDownCanvas = function(event) {
  isMouseDown = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
  stateList.frameState.set("drawing");
};
Frame.prototype.mouseUpCanvas = function() {
  isMouseDown = false;
  stateList.frameState.set("idling");
};
Frame.prototype.mouseMoveCanvas = function(event) {
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
Frame.prototype.drawLine = function(
    startPosition,
    endPosition,
    strokeColor,
    lineWidth) {

  this.canvasContext.strokeStyle = strokeColor;
  this.canvasContext.lineWidth = lineWidth;
  this.canvasContext.beginPath();
  this.canvasContext.moveTo(startPosition.x, startPosition.y);
  this.canvasContext.lineTo(endPosition.x, endPosition.y);
  this.canvasContext.lineCap = "round";
  this.canvasContext.stroke();
};

/**
 * 線で消します。消した部分は透明になります。
 */
Frame.prototype.eraseByLine = function(startPosition, endPosition, lineWidth) {
  this.canvasContext.globalCompositeOperation = "destination-out";
  this.drawLine(startPosition, endPosition, "#000", lineWidth);
  this.canvasContext.globalCompositeOperation = "source-over";
};

Frame.prototype.addEventListener = function(eventName, listener) {
  this.canvasElement.addEventListener(eventName, listener);
};
export default Frame;
