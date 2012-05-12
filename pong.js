// requires Gfx, Keys, Images, Map

Pong = function() {
  function initGameState() {
    return {
      map: Map.initMap(),
      scrollX: 0,
      scrollY: 0,
      scrollDX: 0,
      scrollDY: 0
    }
  }
  function update(gameState) {
    map[2][2] = 1;
    gameState.scrollX += gameState.scrollDX;
    gameState.scrollY += gameState.scrollDY;
  }

  function draw(gameState) {
    Gfx.clearScreen();
    drawBg(gameState.map, gameState.scrollX, gameState.scrollY);
  }

  function drawBg(map, scrollX, scrollY) {
    var startRow = Math.floor(scrollY / Gfx.tileHeight);
    var startCol = Math.floor(scrollX / Gfx.tileWidth);
    for(var row = startRow, screenY = -(scrollY % Gfx.tileHeight);
        row <= startRow + Gfx.screenHeight / Gfx.tileHeight;
        row++, screenY += Gfx.tileHeight) {
      for(var col = startCol, screenX = -(scrollX % Gfx.tileHeight);
          col <= startCol + Gfx.screenWidth / Gfx.tileWidth;
          col++, screenX += Gfx.tileWidth) {
        drawTile(map[row][col], screenX, screenY);
      }
    }
  }

  function drawTile(tileNum, dx, dy) {
    var ctx = Gfx.getCtx();
    var sx = Gfx.tileWidth * (tileNum % Images.tiles.tilesPerRow);
    var sy = Gfx.tileHeight * Math.floor(tileNum / Images.tiles.tilesPerRow);
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
          gameState.scrollDY = -1;
        }
        else if(evt.keyCode == Keys.DOM_VK_DOWN) {
          gameState.scrollDY = 1;
        }
        else if(evt.keyCode == Keys.DOM_VK_LEFT) {
          gameState.scrollDX = -1;
        }
        else if(evt.keyCode == Keys.DOM_VK_RIGHT) {
          gameState.scrollDX = 1;
        }
      },
      handleKeyUp: function(evt) {
        if(evt.keyCode == Keys.DOM_VK_UP || evt.keyCode == Keys.DOM_VK_DOWN) {
          gameState.scrollDY = 0;
        }
        else if(evt.keyCode == Keys.DOM_VK_LEFT || evt.keyCode == Keys.DOM_VK_RIGHT) {
          gameState.scrollDX = 0;
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
