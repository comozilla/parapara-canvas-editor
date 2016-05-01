// currentFrameに変更があった時、canvasの画像を切り替える必要があるが、
// その処理をここで行う。
function ObserveCurrentFrame(paintManager, framesController) {
  framesController.currentFrameId.subscribe(function(nextCurrentFrame) {
    // 今のCanvasを今のFrameに書き込む
    framesController.getCurrentFrame().imageData = paintManager.getImageData();

    // 次のFrameをCanvasに反映させる
    let nextImageData = framesController.getFrameById(nextCurrentFrame).imageData;
    if (nextImageData !== null) {
      paintManager.setImageData(nextImageData);
    }
  });
}

module.exports = ObserveCurrentFrame;
