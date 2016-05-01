function LineWidthPickerPanel(elem, drawingConfig) {
  // このelem には、input[type="range"] 要素が入ってくる（はず）。
  this.element = elem;
  this.config = drawingConfig;
  this.config.eventPublisher.subscribe("lineWidth", (lineWidth) => {
    this.element.value = lineWidth;
  });
  this.element.addEventListener("change", event => {
    this.config.eventPublisher.publish("lineWidth", event.target.value);
  });
}

LineWidthPickerPanel.prototype.changeMaxLineWidth = function(maxLineWidth) {
  // TODO
};

LineWidthPickerPanel.prototype.changeMinLineWidth = function(minLineWidth) {
  // TODO
};

module.exports = LineWidthPickerPanel;
