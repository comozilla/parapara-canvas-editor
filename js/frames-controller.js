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
    this.canvasModel.setImageData(this.getCurrentFrame().imageData);
  };
  updateCurrentFrameImageData = () => {
    let CurrentFrame = this.getCurrentFrame();
    // CurrentFrameは削除されている可能性がある
    if (typeof CurrentFrame !== "undefined") {
      CurrentFrame.imageData = this.canvasModel.getImageData();
    }
  };

  eventPublisher.subscribe("currentFrameId", updateImageDataToNextData);
  eventPublisher.subscribe("openMenu", updateCurrentFrameImageData);
}

// パラメータ frameId : どこの後ろに追加するのか（今は実装していない）
FramesController.prototype.append = function(frameId) {
  const frame = new Frame();
  // 今はいいが、あとで splice に変える
  this.frames.push(frame);
  eventPublisher.publish("frames", {
    frames: this.frames,
    action: "append",
    actionFrame: this.frames.length - 1
  });
};

FramesController.prototype.remove = function(frameId) {
  if (this.frames.length <= 1) {
    throw new Error("残りフレーム数が1なので、削除することができません。");
  }
  let nextCurrentFrameId = this.currentFrameId;
  if (this.currentFrameId >= this.frames.length - 1) {
    nextCurrentFrameId--;
  }
  this.frames.splice(frameId, 1);
  this.canvasModel.updateCurrentFrameImageData(
    this.getFrameById(nextCurrentFrameId).imageData);
  eventPublisher.publish("frames", {
    frames: this.frames,
    action: "remove",
    actionFrame: frameId
  });
  eventPublisher.publish("currentFrameId", nextCurrentFrameId);
};

FramesController.prototype.moveFrame = function(frameId, moveDirection) {
  this.getCurrentFrame().imageData = this.canvasModel.getImageData();
  if (moveDirection === "up") {
    if (frameId <= 0) {
      // frameIdが0以下だった場合は、上と交換する事ができない
      return;
    }
    let frameTmp = this.frames[frameId - 1];
    this.frames[frameId - 1] = this.frames[frameId];
    this.frames[frameId] = frameTmp;
    // currentFrameの内容が変わった可能性があるため、再描画する
    this.canvasModel.setImageData(this.frames[this.currentFrameId].imageData);
    eventPublisher.publish("frames", {
      frames: this.frames,
      action: "moveUp",
      actionFrame: frameId
    });
  } else if (moveDirection === "down") {
    if (frameId >= this.frames.length - 1) {
      return;
    }
    let frameTmp = this.frames[frameId + 1];
    this.frames[frameId + 1] = this.frames[frameId];
    this.frames[frameId] = frameTmp;

    this.canvasModel.setImageData(this.frames[this.currentFrameId].imageData);
    eventPublisher.publish("frames", {
      frames: this.frames,
      action: "moveDown",
      actionFrame: frameId
    });
  }
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
