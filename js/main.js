import FramesController from "./frames-controller";
import DrawingConfiguration from "./drawing-configuration";
import ViewManager from "./view-manager";
import PaintManager from "./paint-manager";
import Player from "./player";

// webpack
import "./../css/style.css";
import "font-awesome";
import "web-animations-js";

let framesController;
let drawingConfiguration;
let viewManager;
let paintManager;
let player;

document.addEventListener("DOMContentLoaded", function() {
  const firstFrameId = 0;
  const canvas = document.getElementById("canvas");
  framesController = new FramesController(canvas);

  drawingConfiguration = new DrawingConfiguration();
  viewManager = new ViewManager(framesController);

  paintManager = new PaintManager(canvas);

  player = new Player(framesController);

  drawingConfiguration.setDefaultValues();

  framesController.append(firstFrameId);
  framesController.setCurrentFrame(firstFrameId);
});

