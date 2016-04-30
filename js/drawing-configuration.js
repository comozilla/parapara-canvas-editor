var ColorPickerPanel = require("./color-picker-panel");
var LineWidthPickerPanel = require("./line-width-picker-panel");

function DrawingConfiguration() {
  const defaultPalleteColors = ["red", "orange", "yellow", "lightgreen",
    "green", "skyblue", "blue", "purple", "black", "white"];
  this.colorPickerPanel = new ColorPickerPanel(document.getElementById("menu-colors"), "red");
  defaultPalleteColors.forEach(color =>
    void this.colorPickerPanel.addPalette(color));
  this.lineWidthPickerPanel = new LineWidthPickerPanel(document.getElementById("menu-line-width"), 10);
}

module.exports = DrawingConfiguration;
