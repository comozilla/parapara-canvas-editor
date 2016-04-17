// コンストラクタで、
// HTMLCanvasElementとなる this.canvasElement も生成し、appendChildします。
function ParaparaCanvas(canvasId, parentNode) {
  if (!(canvasElement instanceof HTMLCanvasElement)) {
    throw new Error("ParaparaCanvas インスタンスを作成しようとしましたが、canvasElementが不正な値です。 : " + canvasElement);
  }
  var canvasElem = document.createElement("canvas");
  canvasElem.width = window.innerWidth;
  canvasElem.height = window.innerHeight;
  canvasElem.id = "canvas" + canvasId;
  // + リスナー（mouseMoveなど）
  parentNode.appendChild(canvasElem);
  this.canvasElement = canvasElem;
  // private メンバにしたいけど・・
  this.canvasContext = this.canvasElement.getContext("2d");
}

/**
 * 線を描きます。
 */
ParaparaCanvas.prototype.drawLine = function(startPosition, endPosition, strokeColor, lineWidth) {
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
ParaparaCanvas.prototype.eraseByLine = function(startPosition, endPosition, lineWidth) {
  this.canvasContext.globalCompositeOperation = "destination-out";
  this.canvasContext.lineWidth = lineWidth;
  this.canvasContext.beginPath();
  this.canvasContext.moveTo(startPosition.x, startPosition.y);
  this.canvasContext.lineTo(endPosition.x, endPosition.y);
  this.canvasContext.lineCap = "round";
  this.canvasContext.stroke();
  this.canvasContext.globalCompositeOperation = "source-over";
};

ParaparaCanvas.prototype.addEventListener = function(eventName, listener) {
  this.canvasElement.addEventListener(eventName, listener);
};
module.exports = ParaparaCanvas;