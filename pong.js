// requires Gfx, Keys, Images

Pong = function() {
   function initGameState() {
     return {
       paddle1: makePaddle(16, 240-16, 64, 16),
       paddle2: makePaddle(640-32, 240-16, 64, 16),
       ball: makeBall(320, 240, Util.randint(4), Util.randint(4), 8)
     }
   }

   function makePaddle(x, y, length, width) {
    return {
      x: x,
      y: y,
      dy: 0,
      length: length,
      width: width
    }
  }

  function makeBall(x, y, dx, dy, radius) {
    return {
      x: x,
      y: y,
      dx: dx,
      dy: dy,
      radius: radius
    }
  }

  function update(gameState) {
    updateBall(gameState.ball);
    updatePaddle(gameState.paddle1);
    updatePaddle(gameState.paddle2);
  }

  function updateBall(ball) {
     ball.x += ball.dx;
     ball.y += ball.dy;
   }
   
  function updatePaddle(paddle) {
     paddle.y += paddle.dy;
  }

  function draw(gameState) {
    Gfx.clearScreen();
    drawPaddle(gameState.paddle1);
    drawPaddle(gameState.paddle2);
    drawBall(gameState.ball);
    drawBg();
  }

  function drawPaddle(paddle) {
    var ctx = Gfx.getCtx();
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.length);
  }
   
  function drawBall(ball) {
    var ctx = Gfx.getCtx();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
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
          gameState.paddle1.dy = -4;
        }
        else if(evt.keyCode == Keys.DOM_VK_DOWN) {
          gameState.paddle1.dy = 4;
        }
      },
      handleKeyUp: function(evt) {
        if(evt.keyCode == Keys.DOM_VK_UP || evt.keyCode == Keys.DOM_VK_DOWN) {
          gameState.paddle1.dy = 0;
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
