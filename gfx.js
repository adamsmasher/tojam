Gfx = function() {
  function getCanvas() {
     return document.getElementById('canvas')
  }
  function getCtx() {
     return getCanvas().getContext('2d');
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
