const ColorPickerView = require("./view/color-picker-view");
const LineWidthPickerView = require("./view/line-width-picker-view");
const MenuView = require("./view/menu-view");
const SequenceView = require("./view/sequence-view");
const eventPublisher = require("./publisher");

function ViewManager(drawingConfig) {
  this.colorPicker = new ColorPickerView(document.getElementById("menu-colors"), drawingConfig);
  eventPublisher.subscribe("defaultPalleteColors", (colors) => {
    this.colorPicker.clearPalette();
    colors.forEach(color => {
      this.colorPicker.addPalette(color);
    });
  });
  
  this.lineWidthPicker = new LineWidthPickerView(
      document.getElementById("menu-line-width"), drawingConfig);

  this.sequence = new SequenceView(document.getElementById("thumbnails"));

  this.menu = new MenuView();
}

module.exports = ViewManager;
