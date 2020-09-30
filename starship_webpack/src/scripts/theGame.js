import Game from "./game.js";

/*recup canva*/
let canvas = document.getElementById("stars");
/*new game with canvas*/
let theGame = new Game(canvas);

window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
theGame.checkAnimation();

/*button add*/
document.getElementById("nouvelleSoucoupe").onclick = function() {
  theGame.addSaucer();
}

/*button infinite*/
document.getElementById("flotteSoucoupes").onclick = function() {
  theGame.infiniteSaucers();
}

/*button beastMode*/
document.getElementById("beastMode").onclick = function() {
  theGame.beastMod();
}
