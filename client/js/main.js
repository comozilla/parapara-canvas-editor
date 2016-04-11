+function() {
  var canvas = {};
  !function() {
    var canvasElement;
    var ctx;
    var beforeMousePosX = 0;
    var beforeMousePosY = 0;
    canvas = {
      isMouseDown: false,
      setupCanvas: function() {
        canvasElement = document.getElementById("canvas");
        ctx = canvasElement.getContext("2d");
        canvas.resizeCanvas();
        window.addEventListener("resize", canvas.resizeCanvas);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 10;
        canvasElement.addEventListener("mousedown", function(event) {
          canvas.isMouseDown = true;
          beforeMousePosX = event.clientX;
          beforeMousePosY = event.clientY;
        });
        canvasElement.addEventListener("mouseup", function() {
          canvas.isMouseDown = false;
        });
        canvasElement.addEventListener("mousemove", function(event) {
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
      addEventListener: function(eventName, listener) {
        canvasElement.addEventListener(eventName, listener);
      },
      resizeCanvas: function() {
        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;
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
      }
    };
  }();
  var menu = {};
  !function() {
    menu = {
      toggleOpenMenuButton: function (isVisible) {
        document.getElementById("btn-open-inspector").style.display = isVisible ? "block" : "none";
      },
      setDefaultValues: function () {
        document.getElementById("menu-line-width").value = 10;
        menu.initializeFrame();
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
      frameCount: 0,
      initializeFrame: function() {
        menu.currentFrameId = 0;
        menu.frameCount = 1;
        menu.updateMenuFrameUI();
      },
      updateMenuFrameUI: function() {
        if (menu.frameCount <= 1) {
          menu.disableFrameButton("btn-frame-prev");
          menu.disableFrameButton("btn-frame-remove");
        }
        if (menu.currentFrameId + 1 >= menu.frameCount) {
          menu.disableFrameButton("btn-frame-next");
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
    canvas.setupCanvas();
    menu.setDefaultValues();
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
}();