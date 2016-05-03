const Frame = require("./frame");
const eventPublisher = require("./publisher");
// frame の追加・削除、currentFrameの切り替えをModel上で行う
function FramesController() {
  this.frames = [];
  this.currentFrameId = 0;
  eventPublisher.subscribe("currentFrameId:after", (frameId) => {
    let nextImageData;

    this.currentFrameId = frameId;
    
    nextImageData = this.getCurrentFrame().imageData;
    // 初めて作るFrame（nextImageDataがnull）の時は、
    // 前のFrameの内容をそのままコピーするため、imageDataをpublishする必要はない。
    if (nextImageData !== null) {
      eventPublisher.publish("imageData", nextImageData);
    }
  });

  eventPublisher.subscribe("imageData", (imageData) => {
    // この時の currentFrame は、変更される前を示す。
    this.getCurrentFrame().imageData = imageData;
  });

  eventPublisher.subscribe("appendFrame", (nextFrameId) => {
    this.append(nextFrameId - 1);
  });
}

// パラメータ id : どこの後ろに追加するのか（今は実装していない）
FramesController.prototype.append = function(id) {
  const frame = new Frame();
  // 今はいいが、あとで splice に変える
  this.frames.push(frame);
  eventPublisher.publish("frames", this.frames);
};

FramesController.prototype.remove = function() {

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
module.exports = FramesController;
