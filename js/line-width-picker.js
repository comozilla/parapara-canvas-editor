function LineWidthPicker(elem, defaultLineWidth) {
  // このelem には、input[type="range"] 要素が入ってくる（はず）。
  this.element = elem;
  this.lineWidth = defaultLineWidth;
  this.element.value = this.lineWidth //by yusuke endho
  this.element.addEventListener("change", event => {
  this.lineWidth = event.target.value;
  });
}

LineWidthPicker.prototype.changeMaxLineWidth = function(maxLineWidth) {
  // TODO
};

LineWidthPicker.prototype.changeMinLineWidth = function(minLineWidth) {
  // TODO
};

module.exports = LineWidthPicker;
