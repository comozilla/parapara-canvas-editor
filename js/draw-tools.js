function ColorPicker(elem, defaultColor) {
  // このelem には、ul要素が入ってくる（はず）。
  this.element = elem;
  this.color = defaultColor;
  Array.prototype.forEach.call(this.element.childNodes, childNode => {
    childNode.addEventListener("click", event => {
      // アロー関数にしているため、this はインスタンス。
      this.color = event.target.style.backgroundColor;
    });
  });
}
ColorPicker.prototype.addColorUI = function(color) {
  // 将来的には、ColorPicker.prototype.addColorUI とかで
  // 色を js から増やせたりしたいが、html を弄るので後で。
  // その時は、追加したNodeにListenerをつけるのを忘れない！
};

function LineWidthPicker(elem, defaultLineWidth) {
  // このelem には、input[type="range"] 要素が入ってくる（はず）。
  this.element = elem;
  this.lineWidth = defaultLineWidth;
  this.element.addEventListener("change", event => {
    this.lineWidth = event.target.value;
  });
}
LineWidthPicker.prototype.changeMaxLineWidth = function(maxLineWidth) {
  // TODO
}
LineWidthPicker.prototype.changeMinLineWidth = function(minLineWidth) {
  // TODO
}

module.exports = {
  ColorPicker: ColorPicker,
  LineWidthPicker: LineWidthPicker
};