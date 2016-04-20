var assert = require("power-assert");
var jsdomify = require("jsdomify").default;
var drawTools = require("./../js/draw-tools.js");

describe("draw-tools.js", function() {
  var menuColorsElem;
  before(function() {
    // テストの開始時にDOMを作る
    jsdomify.create('<!doctype html><html lang="ja"><head></head><body><ul id="menu-colors"><li style="background-color: black;"></li></ul></body></html>');
    menuColorsElem = document.getElementById("menu-colors");
  });
  beforeEach(function() {
    menuColorsElem.innerHTML = "";
  });
  after(function() {
    // テストが終わったら削除する
    jsdomify.destroy();
  });
  it("ColorPicker addColorUI", function() {
    var colorPicker = new drawTools.ColorPicker(menuColorsElem, "white");
    colorPicker.addColorUI("red");
    assert(menuColorsElem.childNodes[0].style.backgroundColor === "red");
  });
  it("ColorPicker listenerCheck (static element)", function() {
    // TODO: jsdomifyで、clickとかが取れるのか
  });
  it("ColorPicker listenerCheck (dynamic element)", function() {
    var colorPicker = new drawTools.ColorPicker(menuColorsElem, "white");
    colorPicker.addColorUI("blue");
    
  });
});