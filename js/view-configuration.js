const ColorPickerView = require("./view/color-picker-view");

function ViewConfiguration(drawingConfig) {
  this.colorPicker = new ColorPickerView(document.getElementById("menu-colors"));
  drawingConfig.eventPublisher.subscribe("defaultPalleteColors", (colors) => {
    this.colorPicker.clearPalette();
    console.log(colors);
    colors.forEach(color => {
      this.colorPicker.addPalette(color);
    });
  });
}

module.exports = ViewConfiguration;
