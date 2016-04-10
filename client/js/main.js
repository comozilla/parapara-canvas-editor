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
  document.addEventListener("DOMContentLoaded", function() {
    canvas.setupCanvas();
    setDefaultValues();
    canvas.addEventListener("mousedown", function() {
      toggleOpenMenuButton(false);
    });
    canvas.addEventListener("mouseup", function() {
      toggleOpenMenuButton(true);
    });
    document.getElementById("btn-open-inspector").addEventListener("click", clickToggleMenu);
    Array.prototype.forEach.call(document.getElementById("menu-colors").childNodes, function(nodes) {
      nodes.addEventListener("click", clickColorItem);
    });
    document.getElementById("menu-line-width").addEventListener("change", changeLineWidthValue);
  });
  function setDefaultValues() {
    document.getElementById("menu-line-width").value = 10;
  }
  function clickColorItem() {
    canvas.setColor(this.style.backgroundColor);
  }
  function toggleOpenMenuButton(isVisible) {
    document.getElementById("btn-open-inspector").style.display = isVisible ? "block" : "none";
  }
  function changeLineWidthValue() {
    canvas.setLineWidth(this.value);
  }
  function clickToggleMenu() {
    document.getElementById("menu").classList.toggle("menu-open");
  }
}();