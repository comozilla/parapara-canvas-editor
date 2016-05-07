import eventPublisher from "./publisher";

class DrawingConfiguration {
  constructor() {
    this.defaultPalleteColors = [];
    this.color = "";
    this.lineWidth = 0;
  }
  
  // これをコンストラクタに入れないのは、
  // ViewManager（など）で、subscribeした後に、
  // publishをしたいため。
  setDefaultValues() {
    this.defaultPalleteColors = [];
    eventPublisher.subscribe("defaultPalleteColors:after",
        (defaultPalleteColors) => {
          this.defaultPalleteColors = defaultPalleteColors;
        });
    eventPublisher.publish("defaultPalleteColors", ["red", "orange", "yellow",
      "lightgreen", "green", "skyblue", "blue", "purple", "black", "white"]);

    this.color = "";
    eventPublisher.subscribe("color:after", (color) => {
      this.color = color;
    });
    eventPublisher.publish("color", "red");

    this.lineWidth = 0;
    eventPublisher.subscribe("lineWidth:after", (lineWidth) => {
      this.lineWidth = lineWidth;
    });
    eventPublisher.publish("lineWidth", 10);
  }  
}

export default DrawingConfiguration;
