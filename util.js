
Util = {
/* a hurr durr javascript you suck */
randint: function(l, u) {
 if(!u) {
   u = l 
   l = 0
 }
 return Math.floor(Math.random()*(u-l) + l)
},


/* for debugging, mostly */
sleep: function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

}
