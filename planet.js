// a Scene that renders the world

Planet = function(world) {
  var scrollY = 0;
  var scrollX = 0;
  var scrollDY = 0;
  var scrollDX = 0;
  
  function click(x,y) {
    //TODO: translate the click into a click on the world (need to factor in
    //      the viewport)
    // also if a disaster is selected at the time of the click, handle it
  }
  
  var frame = 0; //count frames. XXX this hsould be done elsewhere
  function update() {
    frame+=1;
    scrollX += scrollDX;
    scrollY += scrollDY;
    
    //clamp the edges of the viewport
    if(scrollY < 0)
      scrollY = 0;
    if(scrollY > world.map.height * Gfx.tileHeight - Gfx.screenHeight()) {
      scrollY = world.map.height * Gfx.tileHeight - Gfx.screenHeight();
    }

    if(world.critters) {
      for(i=0; i<world.critters.length; i++) {
        var crt = world.critters[i]
        crt.update()
      }
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
    
    
    
    //draw people
    drawPeople();
    
    //draw structures
    
    //draw disasters?
    
    drawScores()
  }
  
  function drawScores() {
    var ctx = Gfx.getCtx();
    ctx.save();
    text = "Gems: " + game.score.toString();
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
    return {x: Util.mod(mapX - scrollX, Gfx.tileWidth*world.map.width), y: mapY - scrollY }
  }

  
  function drawPeople() {
    //draw people
    //world.critters = [{x: 10, y:100}, {x: 50, y:450}]
    if(world.critters) {
      for(i=0; i<world.critters.length; i++) {
        var crt = world.critters[i]
        p = toScreenCoords(crt.x, crt.y)
        var ctx = Gfx.getCtx()
        ctx.fillStyle = ["red", "green", "blue", "purple", "yellow", "grey", "black"][i]
        Gfx.fillCircle(p.x, p.y, 5)
      }
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
    var sx = Gfx.tileWidth * Util.mod(id, Images.tiles.tilesPerRow);
    var sy =
      Gfx.tileHeight * Math.floor(id / Images.tiles.tilesPerRow);

    ctx.drawImage(Images.tiles, sx, sy, Gfx.tileWidth, Gfx.tileHeight,
      dx, dy, Gfx.tileWidth, Gfx.tileHeight);
  }

  function keyDown(evt) {
    if(evt.keyCode == Keys.DOM_VK_UP) {
      scrollDY = -2;
    }   
    else if(evt.keyCode == Keys.DOM_VK_DOWN) {
      scrollDY = 2;
    }
    else if(evt.keyCode == Keys.DOM_VK_LEFT) {
      scrollDX = -2;
    }
    else if(evt.keyCode == Keys.DOM_VK_RIGHT) {
      scrollDX = 2;
    }
  }
  
  function keyUp(evt) {   
    if(evt.keyCode == Keys.DOM_VK_UP || evt.keyCode == Keys.DOM_VK_DOWN) {
      scrollDY = 0;
    }
    else if(evt.keyCode == Keys.DOM_VK_LEFT ||
            evt.keyCode == Keys.DOM_VK_RIGHT)
    {
      scrollDX = 0;
    }
  }
         
  return {
    keyDown: keyDown,  
    keyUp: keyUp,
    draw: draw,
    update: update,
  }
}
