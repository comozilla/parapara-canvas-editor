const Frame = require("./frame");
const Publisher = require("./publisher");
// frame の追加・削除、currentFrameの切り替えをModel上で行う
function FramesController() {
  this.frames = [];
  this.eventPublisher = new Publisher();
  this.currentFrameId = 0;
}

// パラメータ id : どこの後ろに追加するのか（今は実装していない）
FramesController.prototype.append = function(id) {
  const frame = new Frame();
  // 今はいいが、あとで splice に変える
  this.frames.push(frame);
};

FramesController.prototype.remove = function() {

};

FramesController.prototype.setCurrentFrame = function(frameId) {
  this.currentFrameId = frameId;
  this.eventPublisher.publish("currentFrameId", frameId);
};

FramesController.prototype.getFrameById = function(frameId) {
  return this.frames[frameId];
};

FramesController.prototype.getCurrentFrame = function() {
  return this.frames[this.currentFrameId];
};
module.exports = FramesController;
