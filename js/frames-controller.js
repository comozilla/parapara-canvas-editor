import Frame from "./frame";
import eventPublisher from "./publisher";
import CanvasModel from "./canvas-model";

// frame の追加・削除、currentFrameの切り替えをModel上で行う
function FramesController(canvas) {
  let updateImageDataToNextData;
  this.frames = [];
  this.currentFrameId = 0;
  this.canvasModel = new CanvasModel(canvas);
  updateImageDataToNextData = (frameId) => {
    let beforeFrame = this.getCurrentFrame();
    // beforeFrameは削除されている可能性がある
    if (typeof beforeFrame !== "undefined") {
      beforeFrame.imageData = this.canvasModel.getImageData();
    }
    this.currentFrameId = frameId;
    this.canvasModel.setImageData(this.getCurrentFrame().imageData);
  };
  eventPublisher.subscribe("currentFrameId", updateImageDataToNextData);
}

// パラメータ id : どこの後ろに追加するのか（今は実装していない）
FramesController.prototype.append = function(id) {
  const frame = new Frame(id);
  // 今はいいが、あとで splice に変える
  this.frames.push(frame);
  eventPublisher.publish("frames", this.frames);
};

FramesController.prototype.remove = function(id) {
  if (this.frames.length <= 1) {
    throw new Error("残りフレーム数が1なので、削除することができません。");
  }
  let nextCurrentFrameId = this.currentFrameId;
  if (this.currentFrameId >= this.frames.length - 1) {
    nextCurrentFrameId--;
  }
  this.frames.splice(id, 1);
  this.canvasModel.setImageData(
    this.getFrameById(nextCurrentFrameId).imageData);
  eventPublisher.publish("frames", this.frames);
  eventPublisher.publish("currentFrameId", nextCurrentFrameId);
};

FramesController.prototype.moveFrame = function(frameId, buttonType) {
  console.log(frameId);
  if (buttonType === "up") {
    eventPublisher.publish("currentFrameId", this.currentFrameId - 1);
    console.log(this.frames);
    var frameTmp = this.frames[frameId - 1];
    this.frames[frameId - 1] = this.frames[frameId];
    this.frames[frameId] = frameTmp;
    console.log(this.frames);
    eventPublisher.publish("frames", this.frames);
    alert("hoge↑");
  } else if (buttonType === "down") {
    alert("hoge↓");
  }
};

FramesController.prototype.saveFrame = function(frameId) {

}

FramesController.prototype.setCurrentFrame = function(frameId) {
  eventPublisher.publish("currentFrameId", frameId);
};

FramesController.prototype.getFrameById = function(frameId) {
  return this.frames[frameId];
};

FramesController.prototype.getCurrentFrame = function() {
  return this.frames[this.currentFrameId];
};
export default FramesController;
