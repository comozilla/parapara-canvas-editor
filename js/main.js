const FramesController = require("./frames-controller");
const DrawingConfiguration = require("./drawing-configuration");
const ViewManager = require("./view-manager");
const PaintManager = require("./paint-manager");

// webpack
require("./../css/style.css");
require("font-awesome");
require("web-animations-js");

let framesController;
let drawingConfiguration;
let viewManager;
let paintManager;

document.addEventListener("DOMContentLoaded", function() {
  const firstFrameId = 0;

  drawingConfiguration = new DrawingConfiguration();

  framesController = new FramesController();
  framesController.append(firstFrameId);

  paintManager = new PaintManager(
    document.getElementById("canvas"),
    drawingConfiguration,
    framesController);

  viewManager = new ViewManager(drawingConfiguration, paintManager);

  drawingConfiguration.setDefaultValues();

  framesController.setCurrentFrame(firstFrameId);
});

