

game.soundtrack = document.createElement("audio")
game.soundtrack.setAttribute("id", "soundtrack")
game.soundeffects = []
for(i=0; i<32; i++)
{
  game.soundeffects.push(document.createElement("audio"))
}
