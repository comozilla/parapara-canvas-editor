const FramesController = require("./frames-controller");
const DrawingConfiguration = require("./drawing-configuration");
const Menu = require("./menu");

// webpack
require("./../css/style.css");
require("font-awesome");
require("web-animations-js");

let framesController;
let drawingConfiguration;
let menu;

document.addEventListener("DOMContentLoaded", function() {
  const firstFrameId = 0;
  const firstCanvasId = 0;
  const defaultLineWidth = 10;

  drawingConfiguration = new DrawingConfiguration();

  framesController = new FramesController(document.getElementById("frames"), drawingConfiguration);
  // new Frame() に対する引数は、frameId でなく canvasId を渡すので、変数にしない
  // Todo: frameId と canvasId の統合
  framesController.append(firstFrameId, firstCanvasId);
  framesController.setCurrentFrame(firstFrameId);

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
}
function mouseUpCanvas() {
  menu.toggleOpenMenuButton(true);
}

