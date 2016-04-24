// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
function Frame(canvasId) {
  var canvasElem = document.createElement("canvas");

  canvasElem.width = window.innerWidth;
  canvasElem.height = window.innerHeight;
  canvasElem.id = "canvas" + canvasId;
  // + リスナー（mouseMoveなど）
  this.canvasElement = canvasElem;
  // private メンバにしたいけど・・
  this.canvasContext = this.canvasElement.getContext("2d");
  this.thumbnail = null;
}

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
module.exports = Frame;
