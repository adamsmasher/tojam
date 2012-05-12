
// requires Gfx, Keys, Images, Map

Maps = (function(){
  function Tile(name, id) { return { name: name, id: id} }
  var TileTypes = [Tile("Grass", 0), Tile("Water", 1)] //used as an associative array!

  function Map(path) {
    // todo: make map size parameterizable?
    // todo: use a memoryview and pack our maps tight
    // todo: load maps as images and onto a canvas, and access them by tiles
    var map = {}
    
/* security policy breaks this:
    var tilemap = null;
    var img = new Image();
    img.onload = function() {
  
       var loaded = true;
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
       var tilemap = new Array(map.height*map.width) //row-major order!
       for(var p = 0; p < tilemap.length; p++) tilemap[p] = 0
       /*for(var row = 0; row < map.height; row++) {
         tilemap[row] = new Array(map.width);
         for(var col = 0; col < map.width; col++) {
           tilemap[row][col] = col % 2;
         }
       }*/
        
    map.tileAt = function(row, col) { //don't eat me for the indirection, Adam. I'm doing it because I don't trust your data representation and want it to be swappable
      if(!tilemap) return -1; //silently fail while the map is unloaded
      
      col = col % map.width; //assumption: all our maps lock vertically and loop horizontally
      if(col < 0) col += map.width; //in javascript, modulus gives the remainder on division, instead of doing what everyone else does
      
      if(!(0<=row<map.height)) return -1; //throw RangeError;
      if(!(0<=col<map.width)) return -1; //throw RangeError;
      return tilemap[row*map.width+col]
    }
    
    map.setTileAt = function(row, col, tile) {
      if(!tilemap) return;
      
      
      col = col % map.width; //assumption: all our maps lock vertically and loop horizontally
      if(!(0<=row<map.height)) throw RangeError;
      if(!(0<=col<map.width)) throw RangeError;
      tilemap[row*map.width + col] = tile;
    }
    for(row=0; row<map.height; row++) //debug: put a column of water down the way
      map.setTileAt(row, 0, 1);
    return map;
  }

  return { TileTypes: TileTypes, Map: Map }
})();

    
