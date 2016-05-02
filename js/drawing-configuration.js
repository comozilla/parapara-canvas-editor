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
  this.defaultPalleteColors = ["red", "orange", "yellow", "lightgreen",
    "green", "skyblue", "blue", "purple", "black", "white"];
  eventPublisher.publish("defaultPalleteColors", this.defaultPalleteColors);

  this.color = "red";
  eventPublisher.publish("color", this.color);

  this.lineWidth = 10;
  eventPublisher.publish("lineWidth", this.lineWidth);
};
module.exports = DrawingConfiguration;
