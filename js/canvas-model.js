const eventPublisher = require("./publisher");

// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
function CanvasModel(element, framesController) {
  this.element = element;

  this.context = this.element.getContext("2d");
  this.drawState = "idling";
  eventPublisher.subscribe("drawState", (drawState) => {
    this.drawState = drawState;
  });

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

CanvasModel.prototype.getImageData = function() {
  return this.context.getImageData(0, 0,
    this.element.width, this.element.height);
};

CanvasModel.prototype.setImageData = function(imageData) {
  this.context.clearRect(0, 0,
    this.element.width, this.element.height); // クリアする必要があるのか
  this.context.putImageData(imageData, 0, 0);
};

module.exports = CanvasModel;
