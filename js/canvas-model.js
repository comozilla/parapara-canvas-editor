const eventPublisher = require("./publisher");

// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
function CanvasModel(element) {
  this.element = element;

  this.context = this.element.getContext("2d");
  this.drawState = "idling";

  var changeDrawState = (drawState) => {
    this.drawState = drawState;
  };
  eventPublisher.subscribe("drawState", changeDrawState);

  var changeCurrentFrameId = (nextCurrentFrame) => {
    eventPublisher.publish("imageData", this.getImageData());
  };
  eventPublisher.subscribe("currentFrameId", changeCurrentFrameId);

  // この imageDataというものだが、
  // Modelのように見せているが、実際は存在せず、
  // Viewを変換したものである。
  // このようにするのは、
  // imageDataはcurrentFrameの変更時にしかupdateしないためである。
  var changeImageData = (imageData) => {
    this.context.clearRect(0, 0,
      this.element.width, this.element.height);
    if (imageData !== null) {
      this.context.putImageData(imageData, 0, 0);
    }
  };
  eventPublisher.subscribe("imageData", changeImageData);
}

// 外からはアクセスしないでください。
CanvasModel.prototype.getImageData = function() {
  return this.context.getImageData(0, 0,
    this.element.width, this.element.height);
};

module.exports = CanvasModel;
