function LineWidthPickerPanel(elem, defaultLineWidth) {
  // このelem には、input[type="range"] 要素が入ってくる（はず）。
  this.element = elem;
  this.lineWidth = defaultLineWidth;
  this.element.value = this.lineWidth;
  this.element.addEventListener("change", event => {
    this.lineWidth = event.target.value;
  });
}

LineWidthPickerPanel.prototype.changeMaxLineWidth = function(maxLineWidth) {
  // TODO
};

LineWidthPickerPanel.prototype.changeMinLineWidth = function(minLineWidth) {
  // TODO
};

export default LineWidthPickerPanel;
