// requires Gfx, Keys, Images, Map

Maps = (function() {
  function TileType(name, ids) {
    if(ids.length) { }
    else { ids = [ids] }
    return {
      name: name,
      ids: ids
    }
  }
   //XXX wrong file for this?
   //trick: by repeating frame numbers, we can slow down the animation
  var TileTypes = [TileType("grass", 12),
                   TileType("water", [0,1,2,3,4,5]),
                   TileType("intensegrass", 12),
                   TileType("goatonapole", 11),
                   TileType("mountainHigh", 6), TileType("mountainMed", 7), TileType("mountainLow", 8),
                   TileType("volcano", [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10])];

  function Map(path) {
    // todo: make map size parameterizable?
    // todo: use a memoryview and pack our maps tight
    // todo: load maps as images and onto a canvas, and access them by tiles
    var map = {}
    map.height = 32;
    map.width = 32;
    var tilemap = new Array(map.height*map.width); //row-major order!
    for(var p = 0; p < tilemap.length; p++) {
      tilemap[p] = 0;
    }
        
    map.tileAt = function(row, col) { 
      if(row < 0 || row >= map.height)
        throw RangeError;

      col = Util.mod(col, map.width); //hardcode world-wrapping effect

      return tilemap[row * map.width + col];
    }
    
    map.setTileAt = function(row, col, tile) {
      if(row < 0 || row >= map.height)
        throw RangeError;
      
      col = Util.mod(col, map.width); //hardcode world-wrapping effect
      
      tilemap[row * map.width + col] = tile;
    }

    map.canWalk = function(row, col) {
      try {
        return map.tileAt(row, col) == 0;
      } catch(e) {
        return false;
      }
    }

    //debug: put a column of water down the side
    for(row=0; row<map.height; row++) {
      map.setTileAt(row, 0, 5);
    }
    return map;
  }

  return { 
    TileTypes: TileTypes,
    Map: Map
  }
})();
