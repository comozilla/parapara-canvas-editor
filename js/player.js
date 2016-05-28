import eventPublisher from "./publisher";

// 将来的にもこれが変えられると面白いような（#85 参照）
const playInterval = 250;

/**
 * 再生しているかを表すisPlayingを所持し、
 * 再生された時に、Frameを切り替える処理もここで行う。
 * 再生された時に他に必要な処理（Menuを隠すなど）は、各自クラスでsubscribeして行う。
 */
class Player{
  constructor(framesController){
    this.isPlaying = false;
  this.playInterval = playInterval;
  this.framesController = framesController;
  this.changeFrameId = -1;
  eventPublisher.subscribe("isPlaying", (isPlaying) => {
    this.isPlaying = isPlaying;
    if (this.isPlaying) {
      this.changeFrame(0);
    } else {
      clearTimeout(this.changeFrameId);
    }
  });
  }

 
changeFrame(currentFrameId) {
  let nextCurrentFrameId;
  this.framesController.setCurrentFrame(currentFrameId);
  if (currentFrameId >= this.framesController.frames.length - 1) {
    nextCurrentFrameId = 0;
  } else {
    nextCurrentFrameId = currentFrameId + 1;
  }
  this.changeFrameId = setTimeout(() => {
    this.changeFrame(nextCurrentFrameId);
  }, this.playInterval);
}
}
export default Player;
