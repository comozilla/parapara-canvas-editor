var ParaparaCanvas = require("./parapara-canvas");
function Frame(paraparaCanvas) {
  this.paraparaCanvas = paraparaCanvas;
  this.thumbnail = null; // 将来用
}
Frame.prototype.addThumbnail = function(thumbnail) {
  
};
module.exports = Frame;