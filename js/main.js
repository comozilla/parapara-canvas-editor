var Frame = require("./frame");
var FramesController = require("./frames-controller");
var ColorPicker = require("./color-picker");
var LineWidthPicker = require("./line-width-picker");
var Menu = require("./menu");

var stylesheet = require("./../css/style.css");
var fontAwesome = require("font-awesome");

var framesController;
var colorPicker, lineWidthPicker;
var menu;
document.addEventListener("DOMContentLoaded", function() {
  var firstFrameId = 0;
  framesController = new FramesController(document.getElementById("frames"));
  // new Frame() に対する引数は、frameId でなく canvasId を渡すので、変数にしない
  // Todo: frameId と canvasId の統合
  framesController.append(firstFrameId, new Frame(0));
  setListenerForCanvas(firstFrameId);
  framesController.setCurrentFrame(firstFrameId);

  colorPicker = new ColorPicker(
    document.getElementById("menu-colors"),
    "red");

  lineWidthPicker =
    new LineWidthPicker(document.getElementById("menu-line-width"),
                                  10);

  menu = new Menu();

  document.getElementById("menu-side-btn")
    .addEventListener("click", function() {
      menu.toggleMenu();
    });
});

function setListenerForCanvas(frameId) {
  var pCanvas = framesController.getFrameById(frameId);
  pCanvas.addEventListener("mousedown", mouseDownCanvas);
  pCanvas.addEventListener("mouseup", mouseUpCanvas);
  pCanvas.addEventListener("mousemove", mouseMoveCanvas);
}
// TODO: これらは、ここで、いいのか。
// → parapara-canvas.js に取り込むような気もするが、
//   この情報をWebsocket で送ったり・・となるのであれば、
//   それを parapara-canvas.js でやっていいの？となる。
var isMouseDown = false;
var previousMousePosition = {};
function mouseDownCanvas(event) {
  menu.hideMenu();
  menu.toggleOpenMenuButton(false);
  isMouseDown = true;
  previousMousePosition = {x: event.clientX, y: event.clientY};
}
function mouseUpCanvas() {
  menu.toggleOpenMenuButton(true);
  isMouseDown = false;
}
function mouseMoveCanvas(event) {
  if (isMouseDown) {
    if (colorPicker.color === "white") {
      framesController.getCurrentFrame().eraseByLine(
        previousMousePosition,
        { x: event.clientX, y: event.clientY },
        lineWidthPicker.lineWidth
      );
    } else {
      framesController.getCurrentFrame().drawLine(
        previousMousePosition,
        {x: event.clientX, y: event.clientY},
        colorPicker.color,
        lineWidthPicker.lineWidth
      );
    }
    previousMousePosition = {x: event.clientX, y: event.clientY};
  }
}
