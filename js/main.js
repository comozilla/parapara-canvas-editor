var ParaparaCanvas = require("./parapara-canvas");
var Frame = require("./frame");
var FramesController = require("./frames-controller");
var drawTools = require("./draw-tools");
var Menu = require("./menu");

var framesController;
var colorPicker, lineWidthPicker;
var menu;
document.addEventListener("DOMContentLoaded", function() {
  framesController = new FramesController(document.getElementById("frames"));
  framesController.append(0, new Frame(new ParaparaCanvas(0, framesController.element)));
  setListenerForCanvas(0);
  framesController.setCurrentFrame(0);
  
  colorPicker = new drawTools.ColorPicker(document.getElementById("menu-colors"), "red");
  lineWidthPicker = new drawTools.LineWidthPicker(document.getElementById("menu-line-width"), 10);
  menu = new Menu();
  
  document.getElementById("menu-side-btn").addEventListener("click", function() {
    menu.toggleMenu();
  });
});

function setListenerForCanvas(frameId) {
  var pCanvas = framesController.getCanvasElementByFrameId(frameId);
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
      framesController.getCurrentFrame().paraparaCanvas.eraseByLine(
        previousMousePosition,
        {x: event.clientX, y: event.clientY},
        lineWidthPicker.lineWidth
      );
    } else {
      framesController.getCurrentFrame().paraparaCanvas.drawLine(
        previousMousePosition,
        {x: event.clientX, y: event.clientY},
        colorPicker.color,
        lineWidthPicker.lineWidth
      );
    }
    previousMousePosition = {x: event.clientX, y: event.clientY};
  }
}