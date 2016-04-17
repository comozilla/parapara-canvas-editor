var ParaparaCanvas = require("./parapara-canvas");
var Frame = require("./frame");
var FrameServer = require("./frame-server");
var drawTools = require("./draw-tools");
var Menu = require("./menu");

var frameServer;
var colorPicker, lineWidthPicker;
var menu;
document.addEventListener("DOMContentLoaded", function() {
  // document.body を引数にするのは超絶良くないが、
  // html を変える必要が有るため、後で直さなくてはならない
  frameServer = new FrameServer(document.body);
  colorPicker = new drawTools.ColorPicker(document.getElementById("menu-colors"), "red");
  lineWidthPicker = new drawTools.LineWidthPicker(document.getElementById("menu-line-width"), 10);
  menu = new Menu();
  
  document.getElementById("menu-side-btn").addEventListener("click", function() {
    menu.toggleMenu();
  });
});
