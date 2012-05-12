
Apes = (function() {
  
  //for damping the tails of the acceleration. we don't want bitches flying off in all directions.
  function damp_acceleration(x) {
    var neg = false;
    if(x < 0) neg = true;
    y = Math.exp(-x)
    if(neg) y = -y;
    return y;
  }
  function Ape() {
    var ape = {}
    ape.x = 0
    ape.y = 0
    ape.ax = ape.ay = 0;
    ape.dx = ape.dy = 0;
    ape.update = function() {
      ape.x += ape.dx; ape.y += ape.dy;
      	
      //ape.dx += damp_acceleration(ape.ax);
      //ape.dy += damp_acceleration(ape.ay);
      ape.dx += ape.ax;
      ape.dy += ape.ay;
    
      ape.ax += (Math.random() - 0.5) / 1000
      ape.ay += (Math.random() - 0.5) / 1000
    }
    return ape;
  }
  return {
    Ape: Ape
  }
})();
