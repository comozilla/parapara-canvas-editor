import eventPublisher from "./../publisher";

class LineWidthPickerPanel {
  constructor(elem){
     this.element = elem;
  eventPublisher.subscribe("lineWidth", (lineWidth) => {
    this.element.value = lineWidth;
  });
  this.element.addEventListener("change", event => {
    eventPublisher.publish("lineWidth", event.target.value);
  });
  }

changeMaxLineWidth(maxLineWidth){

  // TODO
};

changeMinLineWidth(minLineWidth){
   // TODO
}
}
export default LineWidthPickerPanel;
