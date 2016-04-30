const State = require("./state");

// 今後、colorPickerのcolorの部分などもこちらに持ってくる予定
var states = {
  frameState: new State("idling")
};
module.exports = states;
