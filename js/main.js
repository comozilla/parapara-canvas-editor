import FramesController from "./frames-controller";
import DrawingConfiguration from "./drawing-configuration";
import Menu from "./menu";

// webpack
import "./../css/style.css";
import "font-awesome";
import "web-animations-js";

let framesController;
let drawingConfiguration;
let menu;

document.addEventListener("DOMContentLoaded", function() {
  const firstFrameId = 0;
  const firstCanvasId = 0;

  drawingConfiguration = new DrawingConfiguration();

  framesController = new FramesController(
    document.getElementById("frames"),
    drawingConfiguration);
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

