(function() {
  game = {}; //global game object
  var framerate = 20 //blah blah blah

  function resize() {
    game.canvas.width = window.innerWidth*0.984;
    game.canvas.height= window.innerHeight*0.983338;
  };

  function loop() {
    game.scene.update()
    game.scene.draw();
  }

  function click(evt) {
    if(game.scene.click) game.scene.click(evt.clientX, evt.clientY)
  }

  function keyDown(evt) {
    if(game.scene.keyDown) game.scene.keyDown(evt)
  }
  function keyUp(evt) {
    if(game.scene.keyUp) game.scene.keyUp(evt)
  }

  window.addEventListener("load", function () {
    game.canvas = document.getElementById("canvas");
    game.canvas.addEventListener("click", click);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    game.scene = TitleScene();
    setInterval(loop, 1000/framerate);
  });

})();
