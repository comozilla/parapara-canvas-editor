const ColorPickerPanel = require("./color-picker-panel");
const LineWidthPickerPanel = require("./line-width-picker-panel");
const SequencePanel = require("./sequence-panel");

function DrawingConfiguration() {
  const defaultPalleteColors = ["red", "orange", "yellow", "lightgreen",
    "green", "skyblue", "blue", "purple", "black", "white"];

  this.colorPickerPanel =
    new ColorPickerPanel(document.getElementById("menu-colors"), "red");
  defaultPalleteColors
    .forEach(color => { this.colorPickerPanel.addPalette(color); });

  this.lineWidthPickerPanel =
    new LineWidthPickerPanel(document.getElementById("menu-line-width"), 10);

  this.sequencePanel = new SequencePanel(document.getElementById("thumbnails"));
}

module.exports = DrawingConfiguration;
