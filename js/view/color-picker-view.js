import eventPublisher from "./../publisher";

class colorpickerview{
  constructor(){
    this.element = elem;
  eventPublisher.subscribe("color", (color) => {
    let selectedPalette = this.element.querySelector(".selected-palette");
    let nextPalette;
    if (selectedPalette !== null) {
      selectedPalette.classList.remove("selected-palette");
    }
    nextPalette = this.element.querySelector("[data-color=\"" + color + "\"]");
    if (nextPalette !== null) {
      nextPalette.classList.add("selected-palette");
    }
  });
  }

addPalette(){
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
}
clearPalette(){
  this.element.innerHTML = "";
};
}

class isColor{
  constructor(){
    const testElement = document.createElement("span");
  testElement.style.backgroundColor = color;

  return testElement.style.backgroundColor !== "";
  }
  }


export default ColorPickerView;
