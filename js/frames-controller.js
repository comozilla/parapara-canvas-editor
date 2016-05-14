import Frame from "./frame";
import eventPublisher from "./publisher";
import CanvasModel from "./canvas-model";

// frame の追加・削除、currentFrameの切り替えをModel上で行う
function FramesController(canvas) {
  let updateImageDataToNextData;
  let updateCurrentFrameImageData;
  this.frames = [];
  this.currentFrameId = 0;
  this.canvasModel = new CanvasModel(canvas);
  updateImageDataToNextData = (frameId) => {
    updateCurrentFrameImageData();
    this.currentFrameId = frameId;
    this.canvasModel.updateCurrentFrameImageData(this.getCurrentFrame().imageData);
  };
  updateCurrentFrameImageData = () => {
    let currentFrame = this.getCurrentFrame();
    // currentFrameは削除されている可能性がある
    if (typeof currentFrame !== "undefined") {
      currentFrame.imageData = this.canvasModel.getImageData();
    }
  };

  eventPublisher.subscribe("currentFrameId", updateImageDataToNextData);
  eventPublisher.subscribe("openMenu", updateCurrentFrameImageData);
}

// パラメータ id : どこの後ろに追加するのか（今は実装していない）
FramesController.prototype.append = function(id) {
  const frame = new Frame();
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
  this.canvasModel.updateCurrentFrameImageData(
    this.getFrameById(nextCurrentFrameId).imageData);
  eventPublisher.publish("frames", this.frames);
  eventPublisher.publish("currentFrameId", nextCurrentFrameId);
};

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
