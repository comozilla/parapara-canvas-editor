import eventPublisher from "./publisher";

// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
function CanvasModel(element) {
  this.element = element;

  this.context = this.element.getContext("2d");
  this.drawState = "idling";
  eventPublisher.subscribe("drawState", (drawState) => {
    this.drawState = drawState;
  });

  eventPublisher.subscribe("currentFrameId", (nextCurrentFrame) => {
    eventPublisher.publish("imageData", this.getImageData());
  });

  // この imageDataというものだが、
  // Modelのように見せているが、実際は存在せず、
  // Viewを変換したものである。
  // このようにするのは、
  // imageDataはcurrentFrameの変更時にしかupdateしないためである。
  eventPublisher.subscribe("imageData", (imageData) => {
    this.context.clearRect(0, 0,
      this.element.width, this.element.height); // クリアする必要があるのか
    this.context.putImageData(imageData, 0, 0);
  });
}

// 外からはアクセスしないでください。
CanvasModel.prototype.getImageData = function() {
  return this.context.getImageData(0, 0,
    this.element.width, this.element.height);
};

export default CanvasModel;
