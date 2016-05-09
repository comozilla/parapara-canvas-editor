import eventPublisher from "./../publisher";

const DISABLE_FRAME_ID = -1;

function SequencePanel(elem, framesController) {
  this.elem = elem;
  this.currentFrameId = 0;
  this.framesController = framesController;
  eventPublisher.subscribe("currentFrameId", (currentFrameId) => {
    this.currentFrameId = currentFrameId;
    this.setCurrentFrame(currentFrameId);
  });
  eventPublisher.subscribe("frames", (frameDetail) => {
    if (frameDetail.action === "append") {
      this.append();
    } else if (frameDetail.action === "remove") {
      this.remove(frameDetail.actionFrame);
    } else if (frameDetail.action === "moveUp") {
      this.moveUp(frameDetail.actionFrame);
    } else if (frameDetail.action === "moveDown") {
      this.moveDown(frameDetail.actionFrame);
    }
  });
  document.getElementById("sequence-add-btn").addEventListener("click", () => {
    this.framesController.append();
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
SequencePanel.prototype.getFrameTemplate = function(frameId) {
  let frame = document.createElement("div");
  let frameDeleteBtn = document.createElement("button");
  let frameUpBtn = document.createElement("button");
  let frameDownBtn = document.createElement("button");
  frame.dataset.frameIndex = frameId;
  frame.classList.add("thumbnail");
  frame.addEventListener("mousedown", (event) => {
    // 子要素のmousedownによる発生を防ぐ
    if (event.target.classList.contains("thumbnail")) {
      eventPublisher.publish("currentFrameId", frame.dataset.frameIndex);
      this.setCurrentFrame(frame);
    }
  });
  frameDeleteBtn.classList.add("frame-delete");
  frameUpBtn.classList.add("frame-up");
  frameUpBtn.addEventListener("mousedown", () => {
    this.framesController.moveFrame(parseInt(frame.dataset.frameIndex), "up");
  });
  frameDownBtn.classList.add("frame-down");
  frameDownBtn.addEventListener("mousedown", () => {
    this.framesController.moveFrame(parseInt(frame.dataset.frameIndex), "down");
  });
  frameDeleteBtn.innerHTML = "<i class=\"fa fa-times\"></i>";
  frameDeleteBtn.addEventListener("mousedown", () => {
    // フレーム数が１つの時は、エラーになるため削除しない。
    if (this.getMaxFrameId() > 0) {
      this.framesController.remove(frame.dataset.frameIndex);
    }
  });
  frameUpBtn.innerHTML = "<i class=\"fa fa-sort-asc\"></i>";
  frameDownBtn.innerHTML = "<i class=\"fa fa-sort-desc\"></i>";
  frame.appendChild(frameDeleteBtn);
  frame.appendChild(frameUpBtn);
  frame.appendChild(frameDownBtn);

  return frame;
};

SequencePanel.prototype.appendToggleFrameEffect = function(frame, isAppend) {
  let direction = isAppend ? "alternate" : "alternate-reverse";
  frame.animate(
    [{ transformOrigin: "0px 0px", transform: "scaleY(0)" },
     { transformOrigin: "0px 100%", transform: "scaleY(1)" }],
    { direction: direction, duration: 250,
      fill: "both", easing: "ease-in-out" });
};
SequencePanel.prototype.appendMoveFrameEffect = function(
    frame, isMoveDown, frameHeight) {
  let beginningValue = isMoveDown ? "" : "-";
  frame.animate(
    [{ transform: `translateY(${beginningValue}${frameHeight})` },
     { transform: "translateY(0px)" }],
    { direction: "alternate", duration: 250,
      fill: "both", easing: "ease-in-out" });
};

SequencePanel.prototype.append = function() {
  let newFrame = this.getFrameTemplate(0);
  // 追加アニメーションを実行
  this.appendToggleFrameEffect(newFrame, true);

  this.elem.appendChild(newFrame);
  this.renumber();
};

SequencePanel.prototype.clear = function() {
  this.elem.innerHTML = "";
};

SequencePanel.prototype.remove = function(frameId) {
  let frame = this.elem.querySelector(`[data-frame-index=\"${frameId}\"]`);
  frame.dataset.frameIndex = DISABLE_FRAME_ID;
  this.appendToggleFrameEffect(frame, false);

  this.renumber();

  setTimeout(() => {
    this.elem.removeChild(frame);
  }, 250);
};

SequencePanel.prototype.renumber = function() {
  let children = this.elem.children;
  let disableFrameCount = 0;
  let childNode;
  let index = 0;
  while (
    typeof (childNode = children[index + disableFrameCount]) !== "undefined") {
    if (typeof childNode.dataset === "undefined" ||
        parseInt(childNode.dataset.frameIndex) === -1) {
      disableFrameCount++;
      continue;
    }
    childNode.dataset.frameIndex = index++;
  }
  this.setCurrentFrame(this.currentFrameId);
};

SequencePanel.prototype.getMaxFrameId = function() {
  return this.elem.children.length - 1;
};

SequencePanel.prototype.moveUp = function(frameId) {
  // 表示上では、frameIdの1つ上の要素を下にしているのと同じである。
  this.moveDown(frameId - 1);
};

SequencePanel.prototype.moveDown = function(frameId) {
  let moveDownFrame =
    this.elem.querySelector(`[data-frame-index=\"${frameId}\"]`);
  let moveUpFrame =
    this.elem.querySelector(`[data-frame-index=\"${(frameId + 1)}\"]`);
  this.elem.removeChild(moveDownFrame);
  this.elem.insertBefore(moveDownFrame, moveUpFrame);

  this.renumber();

  this.appendMoveFrameEffect(moveDownFrame, true,
    getComputedStyle(moveUpFrame).height);
  this.appendMoveFrameEffect(moveUpFrame, false,
    getComputedStyle(moveDownFrame).height);
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
