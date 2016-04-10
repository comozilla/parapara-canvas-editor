+function() {
  var canvas = {
    isMouseDown: false,
    element: null,
    context: null,
    setupCanvas: function() {
      canvas.element = document.getElementById("canvas");
      canvas.context = canvas.element.getContext("2d");
      canvas.context.fillStyle = "red";
      canvas.element.addEventListener("mousedown", function() {
        canvas.isMouseDown = true;
      });
      canvas.element.addEventListener("mouseup", function() {
        canvas.isMouseDown = false;
      });
      canvas.resizeCanvas();
      window.addEventListener("resize", canvas.resizeCanvas);
    },
    attachMouseMoveListener: function(listener) {
      canvas.element.addEventListener("mousemove", listener);
    },
    resizeCanvas: function() {
      canvas.element.width = window.innerWidth;
      canvas.element.height = window.innerHeight;
    }
  };
  document.addEventListener("DOMContentLoaded", function() {
    canvas.setupCanvas();
    canvas.attachMouseMoveListener(mouseMoveCanvas);
    document.getElementById("btn-open-inspector").addEventListener("click", function() {
      document.getElementById("menu").classList.toggle("menu-open");
    });
    Array.prototype.forEach.call(document.getElementById("menu-colors").childNodes, function(nodes) {
      nodes.addEventListener("click", clickColorItem);
    });
  });
  function mouseMoveCanvas(event) {
    if (event.buttons === 1) {
      canvas.context.beginPath();
      canvas.context.arc(event.clientX, event.clientY, 10, Math.PI * 2, false);
      canvas.context.fill();
    }
  }
  function clickColorItem() {
    if (this.style.backgroundColor === "white") {
      canvas.context.globalCompositeOperation = 'destination-out';
    } else {
      canvas.context.globalCompositeOperation = 'source-over';
    }
    console.log(canvas.context.globalCompositeOperation);
    canvas.context.fillStyle = this.style.backgroundColor;
  }
}();