const eventPublisher = require("./publisher");

function DrawingConfiguration() {
  this.defaultPalleteColors = [];
  this.color = "";
  this.lineWidth = 0;
}

// これをコンストラクタに入れないのは、
// ViewManager（など）で、subscribeした後に、
// publishをしたいため。
DrawingConfiguration.prototype.setDefaultValues = function() {
  this.defaultPalleteColors = [];
  eventPublisher.subscribe("defaultPalleteColors", (defaultPalleteColors) => {
    this.defaultPalleteColors = defaultPalleteColors;
  });
  eventPublisher.publish("defaultPalleteColors", ["red", "orange", "yellow",
    "lightgreen", "green", "skyblue", "blue", "purple", "black", "white"]);

  this.color = "";
  eventPublisher.subscribe("color", (color) => {
    this.color = color;
  });
  eventPublisher.publish("color", "red");

  this.lineWidth = 0;
  eventPublisher.subscribe("lineWidth", (lineWidth) => {
    this.lineWidth = lineWidth;
  });
  eventPublisher.publish("lineWidth", 10);
};
module.exports = DrawingConfiguration;
