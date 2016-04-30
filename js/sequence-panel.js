function SequencePanel(elem) {
  this.elem = elem;
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
function getFrameTemplate() {
  let frame = document.createElement("div");
  let frameDeleteBtn = document.createElement("div");
  let frameUpBtn = document.createElement("div");
  let frameDownBtn = document.createElement("div");
  frame.classList.add("thumbnail");
  frameDeleteBtn.classList.add("frame-delete");
  frameUpBtn.classList.add("frame-up");
  frameDownBtn.classList.add("frame-down");
  frameDeleteBtn.innerHTML = "<i class=\"fa fa-times\"></i>";
  frameUpBtn.innerHTML = "<i class=\"fa fa-sort-asc\"></i>";
  frameDownBtn.innerHTML = "<i class=\"fa fa-sort-desc\"></i>";
  frame.appendChild(frameDeleteBtn);
  frame.appendChild(frameUpBtn);
  frame.appendChild(frameDownBtn);

  return frame;
}

SequencePanel.prototype.append = function() {
  let newFrame = getFrameTemplate();
  this.elem.appendChild(newFrame);
  newFrame.addEventListener("click", () => {
    this.setCurrentFrame(newFrame);
  });
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

SequencePanel.prototype.setCurrentFrame = function(frame) {
  const selectedFrame = this.elem.querySelector(".thumbnail-selected");
  if (selectedFrame) {
    selectedFrame.classList.remove("thumbnail-selected");
  }
  frame.classList.add("thumbnail-selected");
};

export default SequencePanel;
