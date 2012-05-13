// a Scene that renders the world

Planet = function(world) {
  var playerRow = 0;
  var playerCol = 0;

  var upPressed = false;
  var downPressed = false;
  var leftPressed = false;
  var rightPressed = false;

  var frame = 0; //count frames. XXX this hsould be done elsewhere
  
  function click(x,y) {
    //TODO: translate the click into a click on the world (need to factor in
    //      the viewport)
    // also if a disaster is selected at the time of the click, handle it
  }
  
  function update() {
    frame++;

    updatePlayer();
    updateScroll();
    
    updateCritters();
    updateGems();
  }

  function updatePlayer() {
    if(upPressed && world.map.canWalk(playerRow - 1, playerCol)) {
      playerRow--;
      playerRow = Math.max(playerRow, 0)
    }
    if(downPressed && world.map.canWalk(playerRow + 1, playerCol)) {
      playerRow++;
      playerRow = Math.min(playerRow, world.map.height-1)
    }
    if(leftPressed && world.map.canWalk(playerRow, playerCol - 1)) {
      playerCol--;
      playerCol = Util.mod(playerCol, world.map.width)
    }
    if(rightPressed && world.map.canWalk(playerRow, playerCol + 1)) {
      playerCol++;
      playerCol = Util.mod(playerCol, world.map.width)	
    }
    dbg.textContent = "(" + playerCol + ", " + playerRow + ")"
  }

  function updateScroll() {
    scrollX = playerCol * Gfx.tileWidth - Gfx.screenWidth()/2;
    scrollY = playerRow * Gfx.tileHeight - Gfx.screenHeight()/2;

    //clamp the edges of the viewport
    if(scrollY < 0)
      scrollY = 0;
    if(scrollY >= world.map.height * Gfx.tileHeight - Gfx.screenHeight()) {
      scrollY = world.map.height * Gfx.tileHeight - Gfx.screenHeight() - 1;
    }
  }

  function updateCritters() {
    if(world.critters) {
      for(i=0; i<world.critters.length; i++) {
        var crt = world.critters[i]
        crt.update()
      }
    }
  }
  
  function updateGems() {
    for(i=0; i<world.gems.length; i++) {
      g = world.gems[i]
      if(g.x == playerCol && g.y == playerRow) {
        game.gems+=1
        world.gems.pop(i)
      }
    }
  }
  function drawGems() {
    for(i=0; i<world.gems.length; i++) {
      var ctx = Gfx.getCtx();
      g = world.gems[i]
      var coords = toScreenCoords(g.x * Gfx.tileWidth,
                                  g.y * Gfx.tileHeight);
      ctx.drawImage(Images.gems[g.type], coords.x, coords.y);
    }
  }

  //this is the number of tiles available onscreen at any moment
  var viewable_tiles = {
    width: Gfx.screenWidth() / Gfx.tileWidth,
    height: Gfx.screenHeight() / Gfx.tileHeight
  }
  
  function draw() {
    Gfx.clearScreen();
    drawMap();
   
    
    //draw structures
    
    //draw disasters?
    

    drawGems();

    drawCritters();
    drawPlayer(); //and this should probably be second last

    drawScores(); //make sure this is last
  }
  
  function drawScores() {
    var ctx = Gfx.getCtx();
    ctx.save();
    text = "Gems: " + game.gems.toString();
    ctx.globalAlpha = 1;
    ctx.font = "20px Helvetica"
    ctx.fillStyle = "yellow"
    ctx.shadowColor = "rgba(170,0,150,255)"
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 1
    //ctx.shadow
    ctx.shadowBlur = 3
    
    //TODO: for fancy: draw gems as glyphs if gems < 5
    ctx.fillText(text, 10, 10+10+20)
    
    //draw health
    text = "Health: "
    w = ctx.measureText(text)
    ctx.fillText(text, 10, 10+10)
    ctx.fillStyle = "red"
    w.height = 20 //durr, TextMetrics doesn't give heights? bitch!
    ctx.fillRect(w.width+8, 10, game.health, 10)
    
    ctx.restore();
  }

  function toScreenCoords(mapX, mapY) {
    return {
      x: Util.mod(mapX - scrollX, Gfx.tileWidth*world.map.width),
      y: mapY - scrollY
    } //TODO: this should wrap with the world
  }

  function drawPlayer() {
    var ctx = Gfx.getCtx();
    var coords = toScreenCoords(playerCol * Gfx.tileWidth,
                                playerRow * Gfx.tileHeight);
    ctx.drawImage(Images.player, coords.x, coords.y);
  }

  function drawCritters() {
    for(i = 0; i < world.critters.length; i++) {
      var crt = world.critters[i];
      p = toScreenCoords(crt.x, crt.y);
      var ctx = Gfx.getCtx();
      ctx.fillStyle = 
        ["red", "green", "blue", "purple", "yellow", "grey", "black"][i];
      Gfx.fillCircle(p.x, p.y, 5);
    }
  }

  function drawMap() {
    var startRow = Math.floor(scrollY / Gfx.tileHeight);
    var startCol = Math.floor(scrollX / Gfx.tileWidth);

    screenXInit = -Util.mod(scrollX, Gfx.tileWidth) //screenXInit;

    for(var row = startRow, screenY = -(Util.mod(scrollY, Gfx.tileHeight));
        row <= startRow + viewable_tiles.height;
        row++, screenY += Gfx.tileHeight) {
      for(var col = startCol, screenX = screenXInit;
          col <= startCol + viewable_tiles.width;
          col++, screenX += Gfx.tileWidth) {
        drawTile(world.map.tileAt(row, col), screenX, screenY);
      }
    }
  }

  function drawTile(tileNum, dx, dy) {
    var tileType = Maps.TileTypes[tileNum];
    var ctx = Gfx.getCtx();
    id = tileType.ids[Math.floor(frame / 8) % tileType.ids.length]
    ctx.drawImage(Images.getTile(id), dx, dy);
  }

  function keyDown(evt) {
    if(evt.keyCode == Keys.DOM_VK_UP) {
      upPressed = true;
    }   
    else if(evt.keyCode == Keys.DOM_VK_DOWN) {
      downPressed = true;
    }
    else if(evt.keyCode == Keys.DOM_VK_LEFT) {
      leftPressed = true;
    }
    else if(evt.keyCode == Keys.DOM_VK_RIGHT) {
      rightPressed = true;
    }
  }
  
  function keyUp(evt) {   
    if(evt.keyCode == Keys.DOM_VK_UP) {
      upPressed = false;
    }   
    else if(evt.keyCode == Keys.DOM_VK_DOWN) {
      downPressed = false;
    }
    else if(evt.keyCode == Keys.DOM_VK_LEFT) {
      leftPressed = false;
    }
    else if(evt.keyCode == Keys.DOM_VK_RIGHT) {
      rightPressed = false;
    }
  }
         
  return {
    keyDown: keyDown,  
    keyUp: keyUp,
    draw: draw,
    update: update,
  }
}
