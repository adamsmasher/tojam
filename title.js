 
//Implements the title screen


TitleText = function(text, font) {
  
  pos = 0
  sin = [] //want to design it so that... every 8 chars is one sine wave!
  for(i=0; i<Math.PI*2; i+=Math.PI*2 / 70) {
     sin.push(Math.sin(i))
  }
  n = text.length
  
  T = {}
  T.draw = function() {
      ctx = Gfx.getCtx()
      ctx.save()
      dx = 0;
      
      ctx.font = "54px serif"
      lens = [] //widths of each char, since doing it one by one doesn't account for natural spacing that the internal renderer would do...
      for(i=0; i<n; i++) lens.push(ctx.measureText(text[i]).width) //huh? the *2 seems to center it properly. wtffff measureText
      total_width = Util.sum(lens)

      start = Math.floor((Gfx.getCanvas().width - total_width) / 2)      
      midline = Math.floor(Gfx.getCanvas().height / 2)
      for(i=0; i<n; i++) //draw letters one by one
        {
        ctx.fillStyle = "brown"
        ctx.fillText(text[i], start+dx, midline+sin[(i + pos) % sin.length]*38)
        dx+=lens[i]
        }
      ctx.restore()
  }
  T.update = function() {
    pos+=1 //make the sine wave wave
  }
  
  return T;
}

TitleScene = function() { 
  
  title_text = TitleText("~~ WORLD _ GAME ~~")
  starfield = Starfield()  
  game.soundtrack.src = "title.ogg";

  return {
    update: function() {
      starfield.update()
      title_text.update()
    },
    click: function(x,y) {
      //should move to the next scene
    },
    draw: function() {
      starfield.draw()
      title_text.draw()
    }
  }
}
