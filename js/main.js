const Frame = require("./frame");
const FramesController = require("./frames-controller");
const SequencePanel = require("./sequence-panel");
const DrawingConfiguration = require("./drawing-configuration");
const Menu = require("./menu");

// webpack
require("./../css/style.css");
require("font-awesome");
require("web-animations-js");

let framesController;
let sequencePanel;
let drawingConfiguration;
let menu;
let isMouseDown = false;
let previousMousePosition = {};

document.addEventListener("DOMContentLoaded", function() {
  const firstFrameId = 0;
  const firstCanvasId = 0;
  const defaultLineWidth = 10;

  framesController = new FramesController(document.getElementById("frames"));
  // new Frame() に対する引数は、frameId でなく canvasId を渡すので、変数にしない
  // Todo: frameId と canvasId の統合
  framesController.append(firstFrameId, new Frame(firstCanvasId));
  setListenerForCanvas(firstFrameId);
  framesController.setCurrentFrame(firstFrameId);

  sequencePanel = new SequencePanel(document.getElementById("thumbnails"));

  drawingConfiguration = new DrawingConfiguration();

  menu = new Menu();

  document.getElementById("menu-side-btn")
    .addEventListener("click", function() {
      menu.toggleMenu();
    });
});

function setListenerForCanvas(frameId) {
  let pCanvas = framesController.getFrameById(frameId);
  pCanvas.addEventListener("mousedown", mouseDownCanvas);
  pCanvas.addEventListener("mouseup", mouseUpCanvas);
  pCanvas.addEventListener("mousemove", mouseMoveCanvas);
}
// TODO: これらは、ここで、いいのか。
// → parapara-canvas.js に取り込むような気もするが、
//   この情報をWebsocket で送ったり・・となるのであれば、
//   それを parapara-canvas.js でやっていいの？となる。
function mouseDownCanvas(event) {
  if (!document.getElementById("menu").classList.contains("menu-open")) {
    menu.toggleOpenMenuButton(false);
  }
  menu.hideMenu();
  isMouseDown = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
}
function mouseUpCanvas() {
  menu.toggleOpenMenuButton(true);
  isMouseDown = false;
}
function mouseMoveCanvas(event) {
  if (isMouseDown) {
    if (drawingConfiguration.colorPicker.color === "white") {
      framesController.getCurrentFrame().eraseByLine(
        previousMousePosition,
        { x: event.clientX, y: event.clientY },
        drawingConfiguration.lineWidthPicker.lineWidth
      );
    } else {
      framesController.getCurrentFrame().drawLine(
        previousMousePosition,
        { x: event.clientX, y: event.clientY },
        drawingConfiguration.colorPicker.color,
        drawingConfiguration.lineWidthPicker.lineWidth
      );
    }
    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
}
