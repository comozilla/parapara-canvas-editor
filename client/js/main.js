+function() {
  var canvas = {
    isMouseDown: false,
    element: null,
    context: null,
    beforeMousePosX: 0,
    beforeMousePosY: 0,
    setupCanvas: function() {
      canvas.element = document.getElementById("canvas");
      canvas.context = canvas.element.getContext("2d");
      canvas.context.fillStyle = "red";
      canvas.element.addEventListener("mousedown", function(event) {
        canvas.isMouseDown = true;
        beforeMousePosX = event.clientX;
        beforeMousePosY = event.clientY;
      });
      canvas.element.addEventListener("mouseup", function() {
        canvas.isMouseDown = false;
      });
      canvas.element.addEventListener("mousemove", function(event) {
        if (canvas.isMouseDown) {
          canvas.context.lineWidth = 10;
          canvas.context.beginPath();
          canvas.context.moveTo(beforeMousePosX, beforeMousePosY);
          canvas.context.lineTo(event.clientX, event.clientY);
          canvas.context.lineCap = "round";
          canvas.context.stroke();
          beforeMousePosX = event.clientX;
          beforeMousePosY = event.clientY;
        }
      });
      canvas.resizeCanvas();
      window.addEventListener("resize", canvas.resizeCanvas);
    },
    resizeCanvas: function() {
      canvas.element.width = window.innerWidth;
      canvas.element.height = window.innerHeight;
    }
  };
  document.addEventListener("DOMContentLoaded", function() {
    canvas.setupCanvas();
    document.getElementById("btn-open-inspector").addEventListener("click", function() {
      document.getElementById("menu").classList.toggle("menu-open");
    });
    Array.prototype.forEach.call(document.getElementById("menu-colors").childNodes, function(nodes) {
      nodes.addEventListener("click", clickColorItem);
    });
  });
  var beforeMousePosX = -1;
  var beforeMousePosY = -1;
  function clickColorItem() {
    if (this.style.backgroundColor === "white") {
      canvas.context.globalCompositeOperation = 'destination-out';
    } else {
      canvas.context.globalCompositeOperation = 'source-over';
    }
    console.log(canvas.context.globalCompositeOperation);
    canvas.context.strokeStyle = this.style.backgroundColor;
  }
}();