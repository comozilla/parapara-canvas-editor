import eventPublisher from "./publisher";
let isMouseDown = false;
let previousMousePosition;
// HTMLCanvasElementをラップし, canvasRenderingContext2Dに関する操作を提供する
class PaintManager{
  constructor() {
    let changeDrawState;

    this.element = element;
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;

    this.element.addEventListener("mousedown",
      event => { this.mouseDownCanvas(event); });
    this.element.addEventListener("mouseup", () => { this.mouseUpCanvas(); });
    this.element.addEventListener("mousemove",
      event => { this.mouseMoveCanvas(event); });

    this.context = this.element.getContext("2d");
    this.drawState = "idling";
    this.isLock = false;

    changeDrawState = (drawState) => {
      this.drawState = drawState;
    };
    eventPublisher.subscribe("drawState", changeDrawState);

    // drawingConfiguration から、コピーしておく。
    this.color = "";
    eventPublisher.subscribe("color", (color) => {
      this.color = color;
    });

    this.lineWidth = 0;
    eventPublisher.subscribe("lineWidth", (lineWidth) => {
      this.lineWidth = lineWidth;
    });

    eventPublisher.subscribe("isPlaying", (isPlaying) => {
      this.isLock = isPlaying;
    });
  }
  
  mouseDownCanvas() {
    if (!this.isLock) {
      isMouseDown = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
      eventPublisher.publish("drawState", "drawing");
    }
  }

  mouseUpCanvas(){
    if (!this.isLock) {
      isMouseDown = false;
      eventPublisher.publish("drawState", "idling");
    }
  }
  mouseMoveCanvas() {
    if (!this.isLock) {
      if (isMouseDown) {
        if (this.color === "white") {
          this.eraseByLine(
              previousMousePosition,
              { x: event.clientX, y: event.clientY },
              this.lineWidth
              );
        } else {
          this.drawLine(
              previousMousePosition,
              { x: event.clientX, y: event.clientY },
              this.color,
              this.lineWidth
              );
        }
        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    }
  }

  /**
   * 線を描きます。
   */
  drawLine(
    startPosition,
      endPosition,
      strokeColor,
      lineWidth) {

    this.context.strokeStyle = strokeColor;
    this.context.lineWidth = lineWidth;
    this.context.beginPath();
    this.context.moveTo(startPosition.x, startPosition.y);
    this.context.lineTo(endPosition.x, endPosition.y);
    this.context.lineCap = "round";
    this.context.stroke();
  }


  /**
   * 線で消します。消した部分は透明になります。
   */
  eraseByLine(
    startPosition,
      endPosition,
      lineWidth) {
    this.context.globalCompositeOperation = "destination-out";
    this.drawLine(startPosition, endPosition, "#000", lineWidth);
    this.context.globalCompositeOperation = "source-over";
  }
}
export default PaintManager;
