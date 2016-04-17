var ParaparaCanvas = require("./parapara-canvas");
var Frame = require("./frame");
var FrameServer = require("./frame-server");
var drawTools = require("./draw-tools");

var frameServer;
var colorPicker, lineWidthPicker;
document.addEventListener("DOMContentLoaded", function() {
  // document.body を引数にするのは超絶良くないが、
  // html を変える必要が有るため、後で直さなくてはならない
  frameServer = new FrameServer(document.body);
  colorPicker = new drawTools.ColorPicker(document.getElementById("menu-colors"));
  lineWidthPicker = new drawTools.LineWidthPicker(document.getElementById("menu-line-width"));
});
