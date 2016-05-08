import eventPublisher from "./../publisher";

function SequencePanel(elem, framesController) {
  this.elem = elem;
  this.maxFrameId = 0;
  this.currentFrameId = 0;
  this.framesController = framesController;
  eventPublisher.subscribe("currentFrameId", (currentFrameId) => {
    this.currentFrameId = currentFrameId;
    this.setCurrentFrame(currentFrameId);
  });
  eventPublisher.subscribe("frames", (framesDetail) => {
    if (framesDetail.action === "append") {
      this.append(this.maxFrameId);
    } else if (framesDetail.action === "remove") {
      this.remove(framesDetail.actionFrame);
    } else {
      this.clear();
      for (this.maxFrameId = 0;
          this.maxFrameId < framesDetail.frames.length; this.maxFrameId++) {
        this.append(this.maxFrameId);
      }
      this.maxFrameId--; // 1つ多くなってしまうから
      this.setCurrentFrame(this.currentFrameId);
    }
  });
  document.getElementById("sequence-add-btn").addEventListener("click", () => {
    this.framesController.append(++this.maxFrameId);
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
function getFrameTemplate(
    frameId,
    mousedownFrameCallback,
    mousedownRemoveCallback,
    frameUpBtnCallback,
    frameDownBtnCallback) {
  let frame = document.createElement("div");
  let frameDeleteBtn = document.createElement("button");
  let frameUpBtn = document.createElement("button");
  let frameDownBtn = document.createElement("button");
  frame.dataset.frameIndex = frameId;
  frame.classList.add("thumbnail");
  frame.addEventListener("mousedown", mousedownFrameCallback);
  frameDeleteBtn.classList.add("frame-delete");
  frameUpBtn.classList.add("frame-up");
  frameUpBtn.addEventListener("mousedown", frameUpBtnCallback);
  frameDownBtn.classList.add("frame-down");
  frameDownBtn.addEventListener("mousedown", frameDownBtnCallback);
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
    console.log(frameId);
    // 子要素のmousedownによる発生を防ぐ
    if (event.target.classList.contains("thumbnail")) {
      eventPublisher.publish("currentFrameId", frameId);
      this.setCurrentFrame(newFrame);
    }
  }, () => {
    // フレーム数が１つの時は、エラーになるため削除しない。
    if (this.maxFrameId > 0) {
      this.framesController.remove(frameId);
    }
  }, () => {
    this.framesController.moveFrame(frameId, "up");
  }, () => {
    this.framesController.moveFrame(frameId, "down");
  });
  // 追加アニメーションを実行
  newFrame.animate(
    [{ transformOrigin: "0px 0px", transform: "scaleY(0)" },
    { transformOrigin: "0px 100%", transform: "scaleY(1)" }],
    { direction: "alternate", duration: 250, fill: "both", easing: "ease-in-out" });

  this.elem.appendChild(newFrame);
};

SequencePanel.prototype.clear = function() {
  this.elem.innerHTML = "";
};

SequencePanel.prototype.remove = function(frameId) {
  let frame = this.elem.querySelector("[data-frame-index=\"" + frameId + "\"]");
  // バグを防止するため、frameIndexは変更しておく
  frame.dataset.frameIndex = -1;
  frame.animate(
    [{ transformOrigin: "0px 0px", transform: "scaleY(1)" },
    { transformOrigin: "0px 100%", transform: "scaleY(0)" }],
    { direction: "alternate", duration: 250, fill: "both", easing: "ease-in-out" });

  this.renumber();

  setTimeout(() => {
    this.elem.removeChild(frame);
  }, 250);
};

SequencePanel.prototype.renumber = function() {
  let children = this.elem.children;
  let disableFrameCount = 0;
  let childNode;
  this.maxFrameId = 0;
  while (typeof (childNode = children[this.maxFrameId + disableFrameCount]) !== "undefined") {
    if (typeof childNode.dataset === "undefined" ||
        parseInt(childNode.dataset.frameIndex) === -1) {
      disableFrameCount++;
      continue;
    }
    childNode.dataset.frameIndex = this.maxFrameId++;
  }
  this.maxFrameId -= disableFrameCount;
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

export default SequencePanel;
