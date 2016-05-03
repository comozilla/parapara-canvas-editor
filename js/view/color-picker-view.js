import eventPublisher from "./../publisher";

function ColorPickerView(elem) {
  // このelem には、ul要素が入ってくる（はず）。
  this.element = elem;
  eventPublisher.subscribe("color", (color) => {
    var selectedPalette = this.element.querySelector(".selected-palette");
    var nextPalette;
    if (selectedPalette !== null) {
      selectedPalette.classList.remove("selected-palette");
    }
    nextPalette = this.element.querySelector("[data-color=\"" + color + "\"]");
    if (nextPalette !== null) {
      nextPalette.classList.add("selected-palette");
    }
  });
}

ColorPickerView.prototype.addPalette = function(color) {
  let palette;

  if (!isColor(color)) {
    throw new Error("不正な色が指定されました。:" + color);
  }

  palette = document.createElement("li");
  palette.dataset.color = color;
  palette.style.backgroundColor = color;
  this.element.appendChild(palette);

  palette.addEventListener("click", event => {
    eventPublisher.publish("color", event.target.style.backgroundColor);
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

export default ColorPickerView;
