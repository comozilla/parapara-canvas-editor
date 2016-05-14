// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
function CanvasModel(element) {
  this.element = element;
  this.context = this.element.getContext("2d");
}

// 外からはアクセスしないでください。
CanvasModel.prototype.getImageData = function() {
  return this.context.getImageData(0, 0,
    this.element.width, this.element.height);
};

CanvasModel.prototype.setImageData = function(imageData) {
  this.context.clearRect(0, 0,
    this.element.width, this.element.height);
  if (imageData !== null) {
    this.context.putImageData(imageData, 0, 0);
  }
};

export default CanvasModel;
