Gfx = function() {
  function getCtx() {
     return document.getElementById('canvas').getContext('2d');
  }

  return {
    getCtx: getCtx,
    clearScreen: function() {
      var ctx = getCtx();
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 640, 480);
    },
    tileWidth: 32,
    tileHeight: 32,
    screenWidth: 640,
    screenHeight: 480
  }
}();
