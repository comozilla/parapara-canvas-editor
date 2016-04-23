function ColorPicker(elem, defaultColor) {
  // このelem には、ul要素が入ってくる（はず）。
  this.element = elem;
  this.color = defaultColor;
}

ColorPicker.prototype.addPalette = function(color) {
  // 将来的には、ColorPicker.prototype.addPallete とかで
  // 色を js から増やせたりしたいが、html を弄るので後で。
  // その時は、追加したNodeにListenerをつけるのを忘れない！

  if (!isColor(color)) {
    throw new Error("不正な色が指定されました。:" + color);
  }

  var obj = document.createElement("li");
  obj.style.backgroundColor = color;

  this.element.appendChild(obj);

  obj.addEventListener("click", event => {
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
