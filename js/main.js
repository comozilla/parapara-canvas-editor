const FramesController = require("./frames-controller");
const DrawingConfiguration = require("./drawing-configuration");
const ViewManager = require("./view-manager");
const Menu = require("./menu");
const PaintManager = require("./paint-manager");

// webpack
require("./../css/style.css");
require("font-awesome");
require("web-animations-js");

let framesController;
let drawingConfiguration;
let viewManager;
let paintManager;
let menu; // todo: あとで動かす

document.addEventListener("DOMContentLoaded", function() {
  const firstFrameId = 0;
  drawingConfiguration = new DrawingConfiguration();
  viewManager = new ViewManager(drawingConfiguration);

  drawingConfiguration.setDefaultValues();

  framesController = new FramesController();
  framesController.append(firstFrameId);

  paintManager = new PaintManager(
    document.getElementById("canvas"),
    drawingConfiguration,
    framesController);

  menu = new Menu(paintManager.eventPublisher);

  document.getElementById("menu-side-btn")
    .addEventListener("click", function() {
      menu.toggleMenu();
    });

  framesController.setCurrentFrame(firstFrameId);
});

