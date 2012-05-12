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
    }
  }
}();
