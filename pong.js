// requires Gfx, Keys, Images, Map

Pong = function() {
  function initGameState() {
    return {
      map: Map.initMap()
    }
  }
  function update(gameState) {
  }

  function draw(gameState) {
    Gfx.clearScreen();
    drawBg(gameState.map);
  }

  function drawBg(map) {
    for(var row = 0; row < Gfx.screenHeight / Gfx.tileHeight; row++) {
      for(var col = 0; col < Gfx.screenWidth / Gfx.tileWidth; col++) {
        drawTile(map[row][col], row, col);
      }
    }
  }

  function drawTile(tileNum, row, col) {
    var ctx = Gfx.getCtx();
    var sx = Gfx.tileWidth * (tileNum % Images.tiles.tilesPerRow);
    var sy = Gfx.tileHeight * (tileNum / Images.tiles.tilesPerRow);
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
