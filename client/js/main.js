+function() {
  var canvas = {};
  !function() {
    var currentCanvas;
    var ctx;
    var beforeMousePosX = 0;
    var beforeMousePosY = 0;
    var canvasIdMax = 0;
    function changeCanvasContext(canvasId) {
      ctx = getCanvas(canvasId).getContext("2d");
      ctx.strokeStyle = "red";
      ctx.lineWidth = 10;
    }
    function getCanvas(id) {
      return document.getElementById("canvas" + id);
    }
    canvas = {
      isMouseDown: false,
      setupCanvas: function(id) {
        var canvasElem = getCanvas(id);
        canvas.resizeCanvas(id);
        window.addEventListener("resize", function() {
          canvas.resizeCanvas(id);
        });
        changeCanvasContext(id);
        canvasElem.addEventListener("mousedown", function(event) {
          canvas.isMouseDown = true;
          beforeMousePosX = event.clientX;
          beforeMousePosY = event.clientY;
        });
        canvasElem.addEventListener("mouseup", function() {
          canvas.isMouseDown = false;
        });
        canvasElem.addEventListener("mousemove", function(event) {
          if (canvas.isMouseDown) {
            ctx.beginPath();
            ctx.moveTo(beforeMousePosX, beforeMousePosY);
            ctx.lineTo(event.clientX, event.clientY);
            ctx.lineCap = "round";
            ctx.stroke();
            beforeMousePosX = event.clientX;
            beforeMousePosY = event.clientY;
          }
        });
      },
      // currentCanvasに！
      addEventListener: function(eventName, listener) {
        currentCanvas.addEventListener(eventName, listener);
      },
      resizeCanvas: function(id) {
        var canvasElem = getCanvas(id);
        canvasElem.width = window.innerWidth;
        canvasElem.height = window.innerHeight;
      },
      setLineWidth: function(width) {
        ctx.lineWidth = width;
      },
      setColor: function(color) {
        if (color === "white") {
          ctx.globalCompositeOperation = 'destination-out';
        } else {
          ctx.globalCompositeOperation = 'source-over';
        }
        ctx.strokeStyle = color;
      },
      addCanvas: function(canvasId) {
        var newCanvas = document.createElement("canvas");
        newCanvas.id = "canvas" + canvasId;
        document.body.appendChild(newCanvas);
        canvas.setupCanvas(canvasId);
      },
      removeCurrentCanvas: function() {
        document.body.removeChild(currentCanvas);
      },
      setCurrentCanvas: function(canvasId) {
        if (getCanvas(canvasId) === null) {
          throw new Error("存在しない CanvasId を current にしようとしました。 : " + canvasId);
        }
        if (document.querySelector(".current-canvas") !== null) {
          document.querySelector(".current-canvas").classList.remove("current-canvas");
        }
        getCanvas(canvasId).classList.add("current-canvas");
        currentCanvas = getCanvas(canvasId);
        changeCanvasContext(canvasId);
      },
      getNewCanvasId: () => ++canvasIdMax,
      initializeCanvasIdMax: function() {
        canvasIdMax = 0;
      }
    };
  }();
  var menu = {};
  !function() {
    // canvasId を配列として記憶しておく
    var frames = [];
    menu = {
      toggleOpenMenuButton: function (isVisible) {
        document.getElementById("btn-open-inspector").style.display = isVisible ? "block" : "none";
      },
      setDefaultValues: function () {
        document.getElementById("menu-line-width").value = 10;
      },
      hideMenu: function() {
        document.getElementById("menu").classList.remove("menu-open");
      },
      showMenu: function() {
        document.getElementById("menu").classList.add("menu-open");
      },
      toggleMenu: function() {
        document.getElementById("menu").classList.toggle("menu-open");
      },
      currentFrameId: 0,
      initializeFrame: function(defaultCurrentCanvasId) {
        menu.currentFrameId = 0;
        frames = [defaultCurrentCanvasId];
        menu.updateMenuFrameUI();
      },
      addFrame: function(beforeFrameId) {
        var newFrameId = beforeFrameId + 1;
        var newId = canvas.getNewCanvasId();
        canvas.addCanvas(newId);
        frames.splice(newFrameId, 0, newId);
        return newFrameId;
      },
      removeFrame: function(frameId) {
        
      },
      changeCurrentFrame: function(newCurrentFrameId) {
        if (Object.keys(frames).indexOf(newCurrentFrameId.toString()) === -1) {
          throw new Error("存在しないフレームを current にしようとしました。 : " + newCurrentFrameId);
        }
        menu.currentFrameId = newCurrentFrameId;
        canvas.setCurrentCanvas(frames[newCurrentFrameId]);
      },
      updateMenuFrameUI: function() {
        // Todo:
        // menu.toggleFrameButton という関数を作り、
        // 第二引数で、disableかenable か渡せば、
        // 冗長な if 文が抜ける
        if (frames.length <= 1) {
          menu.disableFrameButton("btn-frame-remove");
        } else {
          menu.enableFrameButton("btn-frame-remove");
        }
        if (menu.currentFrameId + 1 >= frames.length) {
          menu.disableFrameButton("btn-frame-next");
        } else {
          menu.enableFrameButton("btn-frame-next");
        }
        if (menu.currentFrameId - 1 < 0) {
          menu.disableFrameButton("btn-frame-prev");
        } else {
          menu.enableFrameButton("btn-frame-prev");
        }
      },
      disableFrameButton: function(id) {
        document.getElementById(id).classList.add("btn-menu-frame-disable");
      },
      enableFrameButton: function(id) {
        document.getElementById(id).classList.remove("btn-menu-frame-disable");
      }
    };
  }();
  document.addEventListener("DOMContentLoaded", function() {
    var defaultCurrentCanvasId = 0;
    menu.setDefaultValues();
    canvas.setupCanvas(defaultCurrentCanvasId);
    canvas.setCurrentCanvas(defaultCurrentCanvasId);
    canvas.initializeCanvasIdMax();
    menu.initializeFrame(defaultCurrentCanvasId);
    canvas.addEventListener("mousedown", function() {
      menu.hideMenu();
      menu.toggleOpenMenuButton(false);
    });
    canvas.addEventListener("mouseup", function() {
      menu.toggleOpenMenuButton(true);
    });
    document.getElementById("btn-open-inspector").addEventListener("click", clickToggleMenu);
    Array.prototype.forEach.call(document.getElementById("menu-colors").childNodes, function(nodes) {
      nodes.addEventListener("click", clickColorItem);
    });
    document.getElementById("menu-line-width").addEventListener("change", changeLineWidthValue);
    document.getElementById("btn-frame-add").addEventListener("click", clickAddFrame);
    document.getElementById("btn-frame-prev").addEventListener("click", clickPrevFrame);
    document.getElementById("btn-frame-next").addEventListener("click", clickNextFrame);
  });
  function clickColorItem() {
    canvas.setColor(this.style.backgroundColor);
  }
  function changeLineWidthValue() {
    canvas.setLineWidth(this.value);
  }
  function clickToggleMenu() {
    menu.toggleMenu();
  }
  function clickAddFrame() {
    var newFrameId = menu.addFrame(menu.currentFrameId);
    menu.changeCurrentFrame(newFrameId);
    menu.updateMenuFrameUI();
  }
  function clickPrevFrame() {
    menu.changeCurrentFrame(menu.currentFrameId - 1);
    menu.updateMenuFrameUI();
  }
  function clickNextFrame() {
    menu.changeCurrentFrame(menu.currentFrameId + 1);
    menu.updateMenuFrameUI();
  }
}();