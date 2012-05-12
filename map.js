
// requires Gfx, Keys, Images, Map

Maps = (function(){
  Tile = function(name, id) { return { name: name, id: id} }
  TileTypes = [Tile("Grass", 0), Tile("Water", 1)] //used as an associative array!

  Map = function(path) {
    // todo: make map size parameterizable?
    // todo: use a memoryview and pack our maps tight
    // todo: load maps as images and onto a canvas, and access them by tiles
    map = {}
    
/* security policy breaks this:
    tilemap = null;
    img = new Image();
    img.onload = function() {
  
       loaded = true;
       map.width = img.width;
       map.height = img.height-1;
       img.crossOrigin = true;
      cnv = document.getElementById("second") //createElement("canvas")
      cnv.getContext('2d').drawImage(img, 0, 0)
      //document.body.appendChild(cnv)
      
      //DICKS. this call fails on chromium when running *locally* because a canvas created by a local script . firefox isn't as anal.
      //
      bitmap = cnv.getContext('2d').getImageData(0,0, img.width, img.height).data;
  //construct a tile palette by scanning the first row of the image      
  //...
  //fill in the map based on the palette
  //...   
    }
 
   img.src = path;
   */   
       map.height = 32;
       map.width = 32;
       tilemap = new Array(map.height)
       for(var row = 0; row < map.height; row++) {
         tilemap[row] = new Array(map.width);
         for(var col = 0; col < map.width; col++) {
           tilemap[row][col] = col % 2;
         }
       }
    
    
    
    
    map.tileAt = function(row, col) { //don't eat me for the indirection, Adam. I'm doing it because I don't trust your data representation and want it to be swappable
      if(!tilemap) return 0; //silently fail while the map is unloaded
      if(!(0<=row<map.height)) throw RangeError;
      if(!(0<=col<map.width)) throw RangeError;
      return tilemap[row][col]
    }
    map.setTileAt = function(row, col, tile) {
      if(!tilemap) return;
      tilemap[row][col] = tile;
    }

    return map;
  }

  return { TileTypes: TileTypes, Map: Map }
})();

    
