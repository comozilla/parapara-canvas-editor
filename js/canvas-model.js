import eventPublisher from "./publisher";

// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
function CanvasModel(element) {
  this.element = element;

  this.context = this.element.getContext("2d");
  this.drawState = "idling";

  var changeDrawState = (drawState) => {
    this.drawState = drawState;
  };
  eventPublisher.subscribe("drawState", changeDrawState);

  var updateImageData = (nextCurrentFrame) => {
    eventPublisher.publish("imageData", this.getImageData());
  };
  eventPublisher.subscribe("currentFrameId", updateImageData);

  // この imageDataというものだが、
  // Modelのように見せているが、実際は存在せず、
  // Viewを変換したものである。
  // このようにするのは、
  // imageDataはcurrentFrameの変更時にしかupdateしないためである。
  var changeCanvasByImageData = (imageData) => {
    this.context.clearRect(0, 0,
      this.element.width, this.element.height);
    if (imageData !== null) {
      this.context.putImageData(imageData, 0, 0);
    }
  };
  eventPublisher.subscribe("imageData", changeCanvasByImageData);
  
}

// 外からはアクセスしないでください。
CanvasModel.prototype.getImageData = function() {
  return this.context.getImageData(0, 0,
    this.element.width, this.element.height);
};

export default CanvasModel;
