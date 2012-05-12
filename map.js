Map = {
  initMap: function() {
    // todo: make map size parameterizable?
    var mapWidth = 32;
    var mapHeight = 32;

    map = new Array(mapHeight);
    for(var row = 0; row < mapHeight; row++) {
      map[row] = new Array(mapWidth);
      for(var col = 0; col < mapWidth; col++) {
        map[row][col] = 0;
      }
    }

    return map;
  }
}
