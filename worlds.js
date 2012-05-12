/* worlds is the model for what is happening on a planets
 * hence covers:
 *  -resources / terrain, and the thingies
 *  -where people are on it
 *  -
 *  -
 */

Worlds = (function() {
  World = function(name, map) {
    return { name: name, map: map, toString: function() { return name } }
  }
  return {
    Earth: World("Earth", Maps.Map("maps/earth.png"))
  }
})();
