<<<<<<< HEAD

/* a hurr durr javascript you suck */
function randint(l, u) {
 if(!u) {
   u = l 
   l = 0
 }
 return Math.floor(Math.random()*(u-l) + l)
}


/* for debugging, mostly */
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
