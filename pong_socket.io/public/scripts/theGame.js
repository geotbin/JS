import Pong from "./pong.js";

// HTML canvas used by the scripts
let canvas = document.getElementById("field");

// create the game in the canvas
let theGame = new Pong(canvas);

// init keyboard changes
window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));

