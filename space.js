
//Implements the space screen

//To render text:

/* lum is the inherent luminosity of the star
   twinkle is the current offset from the base luminosity, and it ranges through 9 possible levels at a rate of period
 */

STARFIELD_WIDTH = 1000
STARFIELD_HEIGHT = 800

/* todo: params on this (number of stars, rates) should be configurable */
Starfield = function() {
  Star = function() {   //to handle resizing nicely, the stars are stored as offsets from the *center* of the screen
    return {
      x: Util.randint(-STARFIELD_WIDTH, STARFIELD_WIDTH),
      y: Util.randint(-STARFIELD_HEIGHT, STARFIELD_HEIGHT),
      size: Util.randint(1,4),
      lum: Util.randint(1,4),
      
      twinkle: Util.randint(0,9),
      period: Util.randint(1,5)*2
    }
  }
  
  //twinklesine_table = []
  //for(p=0; p<Math.PI*2; p+=Math.PI*2 / 100) {
  //  twinklesine_table.push(Math.round(Math.sin(p)*17));
  //}
  function twinklesine(i) {
    return Math.sin(Math.PI*2*i/500) * 25 / 100;
    return twinklesine_table[i % twinklesine_table.length] / 10;
    
  }

  starfield = {zoom: 1} //TODO: should listen to the zoom
  
  narquee = 0 //the offset of the marqueeing starfield
  
  stars = []
  stars_n = Math.floor(350+Math.random()*350)
  for(i=0; i<stars_n; i++) {
    stars.push(Star())
  }
  
  starfield.draw = function() {
    ctx = game.canvas.getContext('2d')
    ctx.save()
    ctx.globalAlpha = 1; //IMPORTANT, or else the previous draw won't work right
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, game.canvas.width, game.canvas.height)
    
    //draw stars
    ctx.fillStyle = "white" //white for stars!
    midpoint = {x: Math.floor(game.canvas.width / 2), y: Math.floor(game.canvas.height / 2)}
    
    function drawStar(s) {
      x = s.x + midpoint.x + narquee //todo: offset this by the current scroll value + wrap around
      y = s.y + midpoint.y
      
      ctx.globalAlpha = [0.2,0.35,0.65][s.lum] + twinklesine(s.twinkle)
      Gfx.fillCircle(x, y, s.size)
    }
    
    for(i in stars) {
       drawStar(stars[i]);
    }
    ctx.restore()
  }
  
  function update() {
      for(var i in starfield) {
        s = starfield[i]
        s.twinkle = (s.twinkle+s.period)
      }
      narquee-=.1;
      if(narquee < -STARFIELD_WIDTH) narquee = STARFIELD_WIDTH;
  }
  
 
  update_timer = setInterval(update, 10) //this should be cancelled later on somehow? or maybe use repeated setTimeouts instead, so that if it doesn't get called it stops getting called
  
  //clearInterval(update_timer) //uhhh, when do we do this?
  
  return starfield
}



SpaceScene = function() { 
  
  starfield = Starfield()  
  game.soundtrack.src = "space.ogg";

  return {
    click: function(x,y) {
    
    },
    draw: function() {
      starfield.draw() 
    }
  }
}
