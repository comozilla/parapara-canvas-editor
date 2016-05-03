const eventPublisher = require("./../publisher");

function LineWidthPickerPanel(elem) {
  // このelem には、input[type="range"] 要素が入ってくる（はず）。
  this.element = elem;
  eventPublisher.subscribe("lineWidth", (lineWidth) => {
    this.element.value = lineWidth;
  });
  this.element.addEventListener("change", event => {
    eventPublisher.publish("lineWidth", event.target.value);
  });
}

LineWidthPickerPanel.prototype.changeMaxLineWidth = function(maxLineWidth) {
  // TODO
};

LineWidthPickerPanel.prototype.changeMinLineWidth = function(minLineWidth) {
  // TODO
};

module.exports = LineWidthPickerPanel;
