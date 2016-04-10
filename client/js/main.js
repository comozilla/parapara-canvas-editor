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
      canvas.resizeCanvas();
      window.addEventListener("resize", canvas.resizeCanvas);
      canvas.context.strokeStyle = "red";
      canvas.context.lineWidth = 10;
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
          canvas.context.beginPath();
          canvas.context.moveTo(beforeMousePosX, beforeMousePosY);
          canvas.context.lineTo(event.clientX, event.clientY);
          canvas.context.lineCap = "round";
          canvas.context.stroke();
          beforeMousePosX = event.clientX;
          beforeMousePosY = event.clientY;
        }
      });
    },
    resizeCanvas: function() {
      canvas.element.width = window.innerWidth;
      canvas.element.height = window.innerHeight;
    },
    setLineWidth: function(width) {
      console.log(width);
      canvas.context.lineWidth = width;
    }
  };
  document.addEventListener("DOMContentLoaded", function() {
    canvas.setupCanvas();
    setDefaultValues();
    document.getElementById("btn-open-inspector").addEventListener("click", function() {
      document.getElementById("menu").classList.toggle("menu-open");
    });
    Array.prototype.forEach.call(document.getElementById("menu-colors").childNodes, function(nodes) {
      nodes.addEventListener("click", clickColorItem);
    });
    document.getElementById("menu-line-width").addEventListener("change", function() {
      canvas.setLineWidth(this.value);
    });
  });
  function setDefaultValues() {
    document.getElementById("menu-line-width").value = 10;
  }
  function clickColorItem() {
    if (this.style.backgroundColor === "white") {
      canvas.context.globalCompositeOperation = 'destination-out';
    } else {
      canvas.context.globalCompositeOperation = 'source-over';
    }
    canvas.context.strokeStyle = this.style.backgroundColor;
  }
}();