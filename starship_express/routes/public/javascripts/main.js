import Game from "./game.js";

let canvas = document.getElementById("stars");
let theGame = new Game(canvas);

window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
theGame.checkAnimation();

document.getElementById("nouvelleSoucoupe").onclick = function() {
  theGame.addSaucer();
}

document.getElementById("flotteSoucoupes").onclick = function() {
  theGame.infiniteSaucers();
}

document.getElementById("beastMode").onclick = function() {
  theGame.beastMod();
}
