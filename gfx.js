Gfx = function() {
  var _canvas = null;
  var _ctx = null;
  function getCanvas() {
     if(!_canvas) _canvas = document.getElementById('canvas'); //DOM access is slow, memoize
     return _canvas;
  }
  function getCtx() {
     if(!_ctx) _ctx = getCanvas().getContext('2d');
     return _ctx;
  }

  function fillCircle(x,y,radius) {
    var ctx = getCtx()
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2*Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  screenWidth = function() { return getCanvas().width }
  screenHeight = function() { return getCanvas().height }

  return {
    getCanvas: getCanvas,
    getCtx: getCtx,
    fillCircle: fillCircle,
    clearScreen: function() {
      var ctx = getCtx();
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, screenWidth(), screenHeight());
    },
    tileWidth: 32,
    tileHeight: 32,
    screenWidth: screenWidth,
    screenHeight: screenHeight
  }
}();
