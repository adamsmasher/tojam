
//a Scene that renders the world

//scenes contain viewport

Planet = function(world) {
  var scrollY = 0
  var scrollX = 0
  var scrollDY = 0
  var scrollDX = 0
  
  function click(x,y) {
    //TODO: translate the click into a click on the world (need to factor in the viewport)
    //also if a disaster is selected pick that
  }

  function update() {
    scrollX += scrollDX;
    scrollY += scrollDY;
    
    //clamp the edges of the viewport
    //if(scrollX < 0) scrollX = 0;
    if(scrollY < 0) scrollY = 0;
    //if(scrollX > world.map.width*Gfx.tileWidth-Gfx.screenWidth()) scrollX = world.map.width*Gfx.tileWidth-Gfx.screenWidth()
    if(scrollY > world.map.height*Gfx.tileHeight-Gfx.screenHeight()) scrollY = world.map.height*Gfx.tileHeight-Gfx.screenHeight()
  }

  //this is the number of tiles available onscreen at any moment
  var viewable_tiles = {width: Gfx.screenWidth() / Gfx.tileWidth, height: Gfx.screenHeight() / Gfx.tileHeight}
  
  function draw() {
    //a world *has* to come with a map
    if(!world.map) { console.error("World `"+world.toString()+"` has no map!"); return}
    Gfx.clearScreen()
    
    //draw map
    //XXX map should wrap horizontally but not vertically <-- loren can do this
    var startRow = Math.floor(scrollY / Gfx.tileHeight);
    var startCol = Math.floor(scrollX / Gfx.tileWidth);
    //console.debug(startCol)
    for(var row = startRow, screenY = -(scrollY % Gfx.tileHeight);
        row <= startRow + viewable_tiles.height+1;
        row++, screenY += Gfx.tileHeight) {
      for(var col = startCol, screenX = -(scrollX % Gfx.tileWidth)-Gfx.tileWidth;
          col <= startCol + viewable_tiles.width+1; //+1 to catch the edge
          col++, screenX += Gfx.tileWidth) {
        //try {
        drawTile(world.map.tileAt(row,col), screenX, screenY);
        //} catch(e) { }
        //console.debug(row, col, map.tileAt(row, col))
      }
    }
    
    //draw people
    
    //draw structures
    
    //draw disasters?
  }

  function drawTile(tileNum, dx, dy) {
    var T = Maps.TileTypes[tileNum]
    //if(!T) alert(tileNum)
    var ctx = Gfx.getCtx();
    var sx = Gfx.tileWidth * (T.id % Images.tiles.tilesPerRow);
    var sy = Gfx.tileHeight * Math.floor(T.id / Images.tiles.tilesPerRow);
    ctx.drawImage(Images.tiles, sx, sy, Gfx.tileWidth, Gfx.tileHeight, dx, dy, Gfx.tileWidth, Gfx.tileHeight);
  }


  function keyDown(evt) {
    if(evt.keyCode == Keys.DOM_VK_UP) {
      scrollDY = -Gfx.tileHeight/15;
    }   
    else if(evt.keyCode == Keys.DOM_VK_DOWN) {
      scrollDY = Gfx.tileHeight/15;
    }
    else if(evt.keyCode == Keys.DOM_VK_LEFT) {
      scrollDX = -Gfx.tileWidth/15;
    }
    else if(evt.keyCode == Keys.DOM_VK_RIGHT) {
      scrollDX = Gfx.tileWidth/15;
    }
  }
  
  function keyUp(evt) {   
    if(evt.keyCode == Keys.DOM_VK_UP || evt.keyCode == Keys.DOM_VK_DOWN) {
      scrollDY = 0;
    }
  else if(evt.keyCode == Keys.DOM_VK_LEFT || evt.keyCode == Keys.DOM_VK_RIGHT) {
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
