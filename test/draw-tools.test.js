var assert = require("power-assert");
var jsdomify = require("jsdomify").default;

describe("draw-tools.js", function() {
  var target;
  before(function() {
    // テストの開始時にDOMを作る
    jsdomify.create('<!doctype html><html><body><div id="content"></div></body></html>');
    target = document.querySelector('#content');
  });
  beforeEach(function() {
    target.innerHTML = 'hoge';
  });
  after(function() {
    // テストが終わったら削除する
    jsdomify.destroy();
  });
  it('Can render html', function() {
    assert(target.innerHTML === "hoge");
  });
});