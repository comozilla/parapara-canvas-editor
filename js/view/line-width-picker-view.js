import eventPublisher from "./../publisher";

class LineWidthPickerPanel{
  constructor(){
     this.element = elem;
  eventPublisher.subscribe("lineWidth", (lineWidth) => {
    this.element.value = lineWidth;
  });
  this.element.addEventListener("change", event => {
    eventPublisher.publish("lineWidth", event.target.value);
  });
  }

changeMaxLineWidth(){

  // TODO
};

changeMinLineWidth(){
   // TODO
}
}
export default LineWidthPickerPanel;
