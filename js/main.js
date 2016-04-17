var ParaparaCanvas = require("./parapara-canvas");
var Frame = require("./frame");
var FrameServer = require("./frame-server");
var drawTools = require("./draw-tools");
var Menu = require("./menu");

var frameServer;
var colorPicker, lineWidthPicker;
var menu;
document.addEventListener("DOMContentLoaded", function() {
  frameServer = new FrameServer(document.getElementById("frames"));
  frameServer.append(0, new Frame(ParaparaCanvas.createWithElement(0, frameServer.element)));
  setListenerForCanvas(0);
  frameServer.setCurrentFrame(0);
  
  colorPicker = new drawTools.ColorPicker(document.getElementById("menu-colors"), "red");
  lineWidthPicker = new drawTools.LineWidthPicker(document.getElementById("menu-line-width"), 10);
  menu = new Menu();
  
  document.getElementById("menu-side-btn").addEventListener("click", function() {
    menu.toggleMenu();
  });
});

function setListenerForCanvas(frameId) {
  var pCanvas = frameServer.frames[0].paraparaCanvas;
  pCanvas.addEventListener("mousedown", mouseDownCanvas);
  pCanvas.addEventListener("mouseup", mouseUpCanvas);
  pCanvas.addEventListener("mousemove", mouseMoveCanvas);
}
// TODO: これらは、ここで、いいのか。
// → parapara-canvas.js に取り込むような気もするが、
//   この情報をWebsocket で送ったり・・となるのであれば、
//   それを parapara-canvas.js でやっていいの？となる。
var isMouseDown = false;
var beforeMousePosition = {};
function mouseDownCanvas(event) {
  isMouseDown = true;
  beforeMousePosition = {x: event.clientX, y: event.clientY};
}
function mouseUpCanvas() {
  isMouseDown = false;
}
function mouseMoveCanvas(event) {
  if (isMouseDown) {
    frameServer.frames[frameServer.currentFrameId].paraparaCanvas.drawLine(
      beforeMousePosition,
      {x: event.clientX, y: event.clientY},
      colorPicker.color,
      lineWidthPicker.lineWidth
    );
    beforeMousePosition = {x: event.clientX, y: event.clientY};
  }
}