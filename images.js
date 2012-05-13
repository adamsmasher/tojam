Images = function() {
  var imgs = {
    tiles: new Image(),
    player: new Image()
  };

  imgs.tiles.src = "images/tiles.png";
  imgs.tiles.tilesPerRow = 8;

  imgs.player.src = "images/player.png";

  return imgs;
}()
