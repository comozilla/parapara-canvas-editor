import Frame from "./frame";
import eventPublisher from "./publisher";
import CanvasModel from "./canvas-model";

// frame の追加・削除、currentFrameの切り替えをModel上で行う
class FramesController{
constructor() {
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

append(id) {
   const frame = new Frame();
  // 今はいいが、あとで splice に変える
  this.frames.push(frame);
  eventPublisher.publish("frames", this.frames);
}
remove(id) {
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

setCurrentFrame(frameId){
  eventPublisher.publish("currentFrameId", frameId);
}
 
 getFrameById(frameId){
    return this.frames[frameId];
 }

getCurrentFrame(){
  return this.frames[this.currentFrameId];
}
}





  // 今はいいが、あとで splice に変える

export default FramesController;
