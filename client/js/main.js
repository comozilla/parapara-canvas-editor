+function() {
  var canvas = {
    isMouseDown: false,
    element: null,
    setupCanvas: function() {
      canvas.element = document.getElementById("canvas");
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
  });
  function mouseMoveCanvas() {
    
  }
}();