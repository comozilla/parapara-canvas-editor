var ColorPicker = require("./color-picker");
var LineWidthPicker = require("./line-width-picker");

function DrawingConfiguration() {
  const defaultPalleteColors = ["red", "orange", "yellow", "lightgreen",
    "green", "skyblue", "blue", "purple", "black", "white"];
  this.colorPicker = new ColorPicker(document.getElementById("menu-colors"), "red");
  defaultPalleteColors.forEach(color =>
    void this.colorPicker.addPalette(color));
  this.lineWidthPicker = new LineWidthPicker(document.getElementById("menu-line-width"), 10);
}

module.exports = DrawingConfiguration;
