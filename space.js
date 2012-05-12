
//Implements the space screen

//To render text:

/* lum is the inherent luminosity of the star
   twinkle is the current offset from the base luminosity, and it ranges through 9 possible levels at a rate of period
 */

STARFIELD_WIDTH = 1000
STARFIELD_HEIGHT = 800

Star = function() {
  return {
   x: randint(-STARFIELD_WIDTH, STARFIELD_WIDTH),
   y: randint(-STARFIELD_HEIGHT, STARFIELD_HEIGHT),
   size: randint(1,4),
   lum: randint(1,4),
   
   twinkle: randint(0,9),
   period: randint(1,4)
  }
}



function fillCircle(ctx, x,y,radius) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2*Math.PI)
  ctx.closePath()
  ctx.fill()
}

SpaceScene = function() {
  
  //to handle resizing, the stars are stored as offsets from the *center* of the screen
  twinklesine_table =  [5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0, -1, -1, -1, -2, -2, -2, -3, -3, -3, -4, -4, -4, -5, -5, -5, -4, -4, -4, -3, -3, -3, -2, -2, -2, -1, -1, -1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4] //todo: this can be algorithmacizedddd but I can't think it throug
  twinklesine_table = [0, -1, -2, -3, -4, -5, -6, -7, -6, -5, -4, -3, -2, -1]
  for(p=0; p<Math.PI*2; p+=Math.PI*2 / 100) {
    //twinklesine_table.push(Math.round(Math.sin(p)*17));
  }
  function twinklesine(i) {
    return Math.sin(Math.PI*2*i/100) * 25 / 100;
    return twinklesine_table[i % twinklesine_table.length] / 10;
    
  }
 //alert(twinklesine_table)
  
  starfield = []
  function update() {
      for(var i in starfield) {
        s = starfield[i]
        s.twinkle = (s.twinkle+s.period)
      }
      narquee-=.1;
      if(narquee < -STARFIELD_WIDTH) narquee = STARFIELD_WIDTH;
  }
  
  narquee = 0 //the offset of the marqueeing starfield
 
  setInterval(update, 20) //this should be cancelled later on somehow? or maybe use repeated setTimeouts instead, so that if it doesn't get called it stops getting called
  zoom = 1

  o = {
  
  click: function(x,y) {
    
  },
  draw: function() {
    ctx = game.canvas.getContext('2d')
    ctx.globalAlpha = 1;
    //ctx.beginPath()
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, game.canvas.width, game.canvas.height)
    
    //draw stars
    ctx.fillStyle = "white" //white for stars!
    midpoint = {x: Math.floor(game.canvas.width / 2), y: Math.floor(game.canvas.height / 2)}
    
    function drawStar(s) {
      x = s.x + midpoint.x+narquee //todo: offset this by the current scroll value + wrap around
      y = s.y + midpoint.y
      //s.size = 10;
     
      if(!s.lum) {
        console.debug("OH NO, MISSING s.lum: |"+s+"|")
      }
      ctx.globalAlpha = [0.3,0.4,0.7][s.lum] + twinklesine(s.twinkle)
      
      fillCircle(ctx, x, y, s.size)
    }
    
    for(i in starfield) {
       drawStar(starfield[i]);
    }
  }
  }
  
  stars_n = Math.floor(350+Math.random()*350)
  //stars_n = 1;
  for(i=0; i<stars_n; i++) {
    starfield.push(Star())
  }
  game.soundtrack.src = "space.ogg";
  return o;
}
