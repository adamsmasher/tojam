// requires Gfx, Keys, Images, Map

Maps = (function() {
  function TileType(name, id) {
    return {
      name: name,
      id: id
    }
  }
  var TileTypes = [TileType("Grass", 0), TileType("Water", 1)];

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

      col = col % map.width;
      if(col < 0)
        col = 32 + col;

      return tilemap[row * map.width + col];
    }
    
    map.setTileAt = function(row, col, tile) {
      if(row < 0 || row >= map.height)
        throw RangeError;

      col = col % map.width;
      if(col < 0)
        col = 32 + col;

      tilemap[row * map.width + col] = tile;
    }

    //debug: put a column of water down the side
    for(row=0; row<map.height; row++) {
      map.setTileAt(row, 0, 1);
    }
    return map;
  }

  return { 
    TileTypes: TileTypes,
    Map: Map
  }
})();
