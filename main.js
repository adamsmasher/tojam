(function() {
  game = {}; //global game object
  var framerate = 60 //blah blah blah

  function dickcloud() {
    function font() {
      return Math.floor((Math.random()*30 + 3)) + "px serif";
    }
    var c = game.canvas.getContext('2d')
    var limit = Math.random()*500
    for(i=0; i<limit; i++) {
      c.font = font();
      c.globalAlpha = Math.random()*0.6 + 0.3;
      c.fillText("Dicks", Math.random()*game.canvas.width, Math.random()*game.canvas.height)
      c.beginPath();
      c.arc(Math.random()*game.canvas.width, Math.random()*game.canvas.height, Math.random()*6, 0, Math.PI)
      c.closePath();
      c.fill();
    }
  }

  function resize() {
    game.canvas.width = window.innerWidth*0.984;
    game.canvas.height= window.innerHeight*0.983338;
    //dickcloud();
  };
  //resize = Cowboy.debounce(1, at_begin=true, resize);

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

  //window.addEventListener("resize", resize)

  window.addEventListener("load", function () {
    game.canvas = document.getElementById("canvas");
    //resize()
    game.canvas.addEventListener("click", click)
    window.addEventListener("keydown", keyDown) //weird, event names are case-sensitive
    window.addEventListener("keyup", keyUp)
    game.scene = TitleScene()
    setInterval(loop, 1000/framerate) //if framerate = 60hz, then we need 1/60th of a second, or 1000/60 ms
  })

})();
