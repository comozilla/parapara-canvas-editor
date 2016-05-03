const eventPublisher = require("./../publisher");

function SequencePanel(elem) {
  this.elem = elem;
  this.maxFrameId = 0;
  this.currentFrameId = 0;
  eventPublisher.subscribe("currentFrameId", (currentFrameId) => {
    this.currentFrameId = currentFrameId;
    this.setCurrentFrame(currentFrameId);
  });
  eventPublisher.subscribe("frames", (frames) => {
    this.clear();
    for (this.maxFrameId = 0; this.maxFrameId < frames.length; this.maxFrameId++) {
      this.append(this.maxFrameId);
    }
    this.maxFrameId--; // 1つ多くなってしまうから
    this.setCurrentFrame(this.currentFrameId);
  });
  document.getElementById("sequence-add-btn").addEventListener("click", () => {
    // eventPublisher 本来の使い方なのかわからない。
    // 本当は、このクラスでframesControllerのインスタンスを持っておくのがいいのかもしれない。
    eventPublisher.publish("appendFrame", ++this.maxFrameId);
  });
}

/* フレームの構造
<div id="thumbnails">
  <div class="thumbnail">
    <div class="frame-delete"></div>
    <div class="frame-up"></div>
    <div class="frame-down"></div>
  </div>
  <div class="thumbnail">
    .
    .
    .
  </div>
</div>
*/
function getFrameTemplate(frameId, mousedownFrameCallback, mousedownRemoveCallback) {
  let frame = document.createElement("div");
  let frameDeleteBtn = document.createElement("button");
  let frameUpBtn = document.createElement("button");
  let frameDownBtn = document.createElement("button");
  frame.dataset.frameIndex = frameId;
  frame.classList.add("thumbnail");
  frame.addEventListener("mousedown", mousedownFrameCallback);
  frameDeleteBtn.classList.add("frame-delete");
  frameUpBtn.classList.add("frame-up");
  frameDownBtn.classList.add("frame-down");
  frameDeleteBtn.innerHTML = "<i class=\"fa fa-times\"></i>";
  frameDeleteBtn.addEventListener("mousedown", mousedownRemoveCallback);
  frameUpBtn.innerHTML = "<i class=\"fa fa-sort-asc\"></i>";
  frameDownBtn.innerHTML = "<i class=\"fa fa-sort-desc\"></i>";
  frame.appendChild(frameDeleteBtn);
  frame.appendChild(frameUpBtn);
  frame.appendChild(frameDownBtn);

  return frame;
}

SequencePanel.prototype.append = function(frameId) {
  let newFrame = getFrameTemplate(frameId, (event) => {
    // 子要素のmousedownによる発生を防ぐ
    if (event.target.classList.contains("thumbnail")) {
      eventPublisher.publish("currentFrameId", frameId);
      this.setCurrentFrame(newFrame);
    }
  }, (event) => {
    eventPublisher.publish("removeFrame", frameId);
  });
  this.elem.appendChild(newFrame);
};

SequencePanel.prototype.clear = function() {
  this.elem.innerHTML = "";
};

SequencePanel.prototype.remove = function(frame) {
  this.elem.removeChild(frame);
};

SequencePanel.prototype.moveUp = function() {
  // TODO
};

SequencePanel.prototype.moveDown = function() {
  // TODO
};

SequencePanel.prototype.setCurrentFrame = function(frameIndex) {
  let frame = this.elem.querySelector(`[data-frame-index="${frameIndex}"]`);
  if (frame !== null) {
    const selectedFrame = this.elem.querySelector(".thumbnail-selected");
    if (selectedFrame) {
      selectedFrame.classList.remove("thumbnail-selected");
    }
    frame.classList.add("thumbnail-selected");
  }
};

module.exports = SequencePanel;
