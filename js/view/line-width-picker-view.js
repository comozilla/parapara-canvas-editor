function LineWidthPickerPanel(elem, drawingConfig) {
  // このelem には、input[type="range"] 要素が入ってくる（はず）。
  this.element = elem;
  this.config = drawingConfig;
  this.config.eventPublisher.subscribe("lineWidth", (lineWidth) => {
    this.element.value = lineWidth;
  });
  this.element.addEventListener("change", event => {
    this.config.lineWidth = event.target.value;
    this.config.eventPublisher.publish("lineWidth", this.config.lineWidth);
  });
}

LineWidthPickerPanel.prototype.changeMaxLineWidth = function(maxLineWidth) {
  // TODO
};

LineWidthPickerPanel.prototype.changeMinLineWidth = function(minLineWidth) {
  // TODO
};

module.exports = LineWidthPickerPanel;
