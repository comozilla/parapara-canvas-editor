const FramesController = require("./frames-controller");
const DrawingConfiguration = require("./drawing-configuration");
const CanvasModel = require("./canvas-model");
const ViewManager = require("./view-manager");
const PaintManager = require("./paint-manager");

// webpack
require("./../css/style.css");
require("font-awesome");
require("web-animations-js");

let framesController;
let drawingConfiguration;
let canvasModel;
let viewManager;
let paintManager;

document.addEventListener("DOMContentLoaded", function() {
  const firstFrameId = 0;

  drawingConfiguration = new DrawingConfiguration();

  framesController = new FramesController();
  framesController.append(firstFrameId);

  canvasModel = new CanvasModel(document.getElementById("canvas"));
  paintManager = new PaintManager(document.getElementById("canvas"));

  viewManager = new ViewManager();

  drawingConfiguration.setDefaultValues();

  framesController.setCurrentFrame(firstFrameId);
});

