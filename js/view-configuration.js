const ColorPickerView = require("./view/color-picker-view");
const LineWidthPickerView = require("./view/line-width-picker-view");

function ViewConfiguration(drawingConfig) {
  this.colorPicker = new ColorPickerView(document.getElementById("menu-colors"), drawingConfig);
  drawingConfig.eventPublisher.subscribe("defaultPalleteColors", (colors) => {
    this.colorPicker.clearPalette();
    console.log(colors);
    colors.forEach(color => {
      this.colorPicker.addPalette(color);
    });
  });
  this.lineWidthPicker = new LineWidthPickerView(
      document.getElementById("menu-line-width"), drawingConfig);
}

module.exports = ViewConfiguration;
