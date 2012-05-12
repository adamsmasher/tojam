Util = {
  randint: function(b, a) {
    if(!a) {
      a = 0;
    }
    else {
      var t = b;
      a = b;
      b = t;
    }
    return Math.floor(Math.random()*(b-a) + a)
 }
}
