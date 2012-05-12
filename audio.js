/* notes: mediaGroup is for linking playback together, e.g. a video with its
          attendant audio stream. basically, it's not at all what we need, so
          leave it null
*/

game.soundtrack = document.createElement("audio")
game.soundtrack.setAttribute("id", "soundtrack")
game.soundtrack.autoplay = true;
game.soundtrack.loop = true;

game.soundeffects = []
for(i=0; i<32; i++)
{
  game.soundeffects.push(document.createElement("audio")) //assumption: loop is false by default
}
