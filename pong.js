// requires Gfx, Keys, Images

Pong = function() {
   function initGameState() {
     return {
     }
   }
  function update(gameState) {
  }

  function draw(gameState) {
    Gfx.clearScreen();
    drawBg();
  }

  function drawBg() {
    for(var row = 0; row < Gfx.screenHeight / Gfx.tileHeight; row++) {
      for(var col = 0; col < Gfx.screenWidth / Gfx.tileWidth; col++) {
        drawTile(row, col);
      }
    }
  }

  function drawTile(row, col) {
    var ctx = Gfx.getCtx();
    // TODO: change this to correctly fetch the correct tile based on the tilemap or whateva
    var sx = 0;
    var sy = 0;
    var dx = col * Gfx.tileWidth;
    var dy = row * Gfx.tileHeight;
    ctx.drawImage(Images.tiles, sx, sy, Gfx.tileWidth, Gfx.tileHeight, dx, dy, Gfx.tileWidth, Gfx.tileHeight);
  }

  game = (function() {
    var gameState = initGameState();
    return {
      loop: function() {
        update(gameState);
        draw(gameState);
      },
      handleKeyDown: function(evt) {
        if(evt.keyCode == Keys.DOM_VK_UP) {
        }
        else if(evt.keyCode == Keys.DOM_VK_DOWN) {
        }
      },
      handleKeyUp: function(evt) {
        if(evt.keyCode == Keys.DOM_VK_UP || evt.keyCode == Keys.DOM_VK_DOWN) {
        }
      }
    }
  })();
 
  return {
    install: function(window, ms) {
      window.onkeydown = game.handleKeyDown;
      window.onkeyup = game.handleKeyUp;
      setInterval("game.loop()", ms);
    }
  }
}();
