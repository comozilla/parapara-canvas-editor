function ColorPickerView(elem, drawingConfig) {
  // このelem には、ul要素が入ってくる（はず）。
  this.element = elem;
  this.config = drawingConfig;
}

ColorPickerView.prototype.addPalette = function(color) {
  let palette;

  if (!isColor(color)) {
    throw new Error("不正な色が指定されました。:" + color);
  }

  palette = document.createElement("li");
  palette.style.backgroundColor = color;
  this.element.appendChild(palette);

  palette.addEventListener("click", event => {
    this.config.color = event.target.style.backgroundColor;
    this.config.eventPublisher.publish("color", this.config.color);
  });
};

ColorPickerView.prototype.clearPalette = function() {
  this.element.innerHTML = "";
};

function isColor(color) {
  const testElement = document.createElement("span");
  testElement.style.backgroundColor = color;

  return testElement.style.backgroundColor !== "";
}

module.exports = ColorPickerView;
