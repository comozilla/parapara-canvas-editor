function ColorPicker(elem, defaultColor) {
  // このelem には、ul要素が入ってくる（はず）。
  this.element = elem;
  this.color = defaultColor;
}

ColorPicker.prototype.addPalette = function(color) {
  if (!isColor(color)) {
    throw new Error("不正な色が指定されました。:" + color);
  }

  var palette = document.createElement("li");
  palette.style.backgroundColor = color;

  this.element.appendChild(palette);

  palette.addEventListener("click", event => {
    this.color = event.target.style.backgroundColor;
  });

};

function isColor(color) {
  var testElement = document.createElement("span");
  var beforeColor = testElement.style.backgroundColor =
      color === "red" ? "green" : "red";

  testElement.style.backgroundColor = color;
  return testElement.style.backgroundColor !== beforeColor;
}

module.exports = ColorPicker;
