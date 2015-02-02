(function(){

  var canvasWrap, 
      canvas, 
      ctx, 
      mousePressed, 
      oldX, 
      oldY, 
      sliders,
      lineWidthRange,
      colorChoiceInput,
      bgColorSubmit,
      colorIndicator,
      draw = {
    
    options: {
      'lineThickness': 12,
      'lineJoinStyle': 'round',
      'lineCapStyle' : 'round',
      'currentColor': '#4ea4ed',
      'bgColor': '#000000'
    },
    
    //  Functions: 
    //  init, setBgColor, setColor, setLineWidth,
    //  canvasMouseDown, canvasMouseMove, canvasMouseLeave, canvasMouseUp
    //  updateSliderVal
        
    init: function() {
      canvasWrap = document.querySelector('.canvas-wrap');
      canvas = document.querySelector('#canvas');
      canvas.style.backgroundColor = this.options.bgColor;
      ctx = canvas.getContext('2d');
      mousePressed = false;
      sliders = document.querySelectorAll('input[type="range"]');
      lineWidthRange = document.querySelector('.line-width-range');
      colorChoiceInput = document.querySelectorAll('.color-choice input');
      bgColorSubmit = document.querySelector('.btn--set-background');
      colorIndicator = document.querySelector('.indicator');
      
      
      this.setColor();
      this.setLineWidth();
      alterCanvasSize();
      
      canvas.addEventListener('mousedown', this.canvasMouseDown);
      canvas.addEventListener('mousemove', this.canvasMouseMove);
      canvas.addEventListener('mouseup', this.canvasMouseUp);
      canvas.addEventListener('mouseleave', this.canvasMouseLeave);
      lineWidthRange.addEventListener('change', this.setLineWidth);
      window.addEventListener('resize', alterCanvasSize);
      for (var i = 0; i < sliders.length; i++) {
        sliders[i].addEventListener('change', this.updateSliderVal);
      }
      for (var i = 0; i < colorChoiceInput.length; i++) {
        colorChoiceInput[i].addEventListener('change', this.setColor);
      }
      bgColorSubmit.addEventListener('click', function(e){
        e.preventDefault();
        var val = e.target.parentNode.querySelector('input').value;
        draw.setBgColor(val);
      });
    },
    
    setBgColor: function(color) {
      draw.options.bgColor = color;
      canvas.style.backgroundColor = color;
    },
    
    setColor: function() {
      var valArr = [], 
          inputArr = document.querySelectorAll('.color-choice input'),
          color;
      
      inputArr = Array.prototype.slice.call(inputArr); //convert nodelist to array
      inputArr.forEach(function(e) {
        valArr.push(e.value);
      });
      color = 'rgb(' + valArr.join() + ')';
      draw.options.currentColor = color;
      colorIndicator.style.background = color;
    },
    
    setLineWidth: function() {
      draw.options.lineThickness = lineWidthRange.value;
    },
    
    canvasMouseDown: function(e){
      oldX = e.offsetX;
      oldY = e.offsetY;
      ctx.beginPath();
      ctx.lineWidth = draw.options.lineThickness;
      ctx.lineJoin = draw.options.lineJoinStyle;
      ctx.lineCap = draw.options.lineCapStyle;
      ctx.moveTo(e.offsetX, e.offsetY);
      mousePressed = true;
    },
    
    canvasMouseMove: function(e) {
      if (mousePressed) {
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.strokeStyle = draw.options.currentColor;
        ctx.stroke();
      }
    },
    
    canvasMouseLeave: function(e) {
      mousePressed = false;
    },
    
    canvasMouseUp: function(e){
      mousePressed = false;
      if (oldX === e.offsetX && oldY === e.offsetY) {
        //ctx.fillRect(e.x, e.y, 12, 12);
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, draw.options.lineThickness/2, 0, 360, false);
        ctx.fillStyle = draw.options.currentColor;
        ctx.fill();    
      }
    },
    
    updateSliderVal: function() {
      var el = this.parentNode.querySelector('span');
      el.textContent = this.value;
    }
  }
  

  
  
  
  
  
  // Alter size of canvas based on window width
  // NB: When resizing smaller, it crops image
  // not sure about keeping this
  
  var alterCanvasSize = function() {    
    var containerWidth = canvasWrap.clientWidth,
        containerHeight = canvasWrap.clientHeight,
        currentDrawing = ctx.getImageData(0, 0, containerWidth, containerHeight);
    canvas.width = containerWidth;
    ctx.putImageData(currentDrawing, 0, 0);
  }
  
  // Initialize app
  draw.init();
  
})();