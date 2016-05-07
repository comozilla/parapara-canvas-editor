import eventPublisher from "./publisher";

// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
class CanvasModel {
  constructor(element) {
    this.element = element;
    this.context = this.element.getContext("2d");
  }
  getImageData() {
    return this.context.getImageData(0, 0,
      this.element.width, this.element.height);
  }
  setImageData(imageData) {
    this.context.clearRect(0, 0,
      this.element.width, this.element.height);
    if (imageData !== null) {
      this.context.putImageData(imageData, 0, 0);
    }
  }
}

export default CanvasModel;
