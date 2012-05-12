Util = {
  randint: function(l, u) {
    if(!u) {
      u = l;
      l = 0;
    }
    return Math.floor(Math.random()*(u-l) + l);
  },
  
  sum: function(l) {
    var o = 0;
    for(i = 0; i < l.length; i++)
      o += l[i];
    return o;
  },
  
  /* for debugging, mostly. todo: removeeeeeeee */
  sleep: function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  },

  mod: function(a,m) {
    a = a % m;
    if(a < 0) a+=m;
    return a;
  }
}
