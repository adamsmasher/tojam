Images = function() {
  stashed_tiles = {}
  var imgs = {
    tiles: new Image(),
    player: new Image(),
    getTile: function(id) {
    if(!stashed_tiles[id]) {
    //todo: memoize this
    var sx = Gfx.tileWidth * Util.mod(id, Images.tiles.tilesPerRow);
    var sy = Gfx.tileHeight * Math.floor(id / Images.tiles.tilesPerRow);

    cnv = document.createElement("canvas");
    ctx = cnv.getContext('2d');
    ctx.drawImage(Images.tiles, sx, sy, Gfx.tileWidth, Gfx.tileHeight,
      0, 0, Gfx.tileWidth, Gfx.tileHeight);

    i = new Image();
    i.src = cnv.toDataURL();
    stashed_tiles[id] = i;
    }
    return stashed_tiles[id];
 
    }
  };

  imgs.tiles.src = "images/tiles.png";
  imgs.tiles.tilesPerRow = 8;

  imgs.player.src = "images/player.png";
  
  imgs.gems = []
  imgs.tiles.onload = function() {
      imgs.gems.push(imgs.getTile(12));
      imgs.gems.push(imgs.getTile(13));
      imgs.gems.push(imgs.getTile(37));
      imgs.gems.push(imgs.getTile(38));
      imgs.gems.push(imgs.getTile(39));
  }
  
  

  return imgs;
}()
