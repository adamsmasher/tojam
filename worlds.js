/* worlds is the model for what is happening on a planets
 * hence covers:
 *  -resources / terrain, and the thingies
 *  -where people are on it
 *  -
 *  -
 */

Worlds = (function() {
  World = function(name, map) {
    return { name: name, map: map, toString: function() { return name }, critters: [] }
  }
  var earth = World("Earth", Maps.Map("maps/earth.png"))
  earth.critters.push(Apes.Ape())
  earth.critters.push(Apes.Ape())
  earth.critters[0].x = 600; 
  earth.critters[0].y = 10;
    
  earth.critters[1].x = 130; 
  earth.critters[1].y = 450; 

  earth.critters.push(Apes.Ape())
  earth.critters[1].x = 330; 
  earth.critters[1].y = 310; 

  return {
    Earth: earth
  }
})();
