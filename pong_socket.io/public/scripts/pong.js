import Paddle from "./paddle.js"
import Ball from "./ball.js"
import Network from "./network.js"

export default class Pong{

  /**
   * 
   * init game variables
   * note: paddle and paddle2 are not initialized one after the other to avoid display problem (second paddle will not appear)
   */
  constructor(thecanvas){
    this.paddle = new Paddle("images/paddle.png", 0, (thecanvas.height)/2, thecanvas);
    this.canvas = thecanvas;
    this.context = thecanvas.getContext("2d");
    this.paddle2 = new Paddle("images/paddle.png", thecanvas.width-28, (thecanvas.height)/2, thecanvas);
    this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));;
    // init the ball in the middle of the screen
    this.ball = new Ball("images/balle.png",this.canvas, this);

    // scoreboard
    this.scorePlayer1 = 0;
    this.scorePlayer2 = 0;

    // init end game (game over)
    this.endImage = new Image();
    this.endImage.src = "images/over.jpg";

    // init network part (socket io)
    this.network = new Network(this, this.ball);

    /**
    * these 3 attributes are essentials:
    * ready is true if 2 players are connected
    * started is true when the game has started
    * first is true when the current player is the FIRST player (he start the game,.. cf. socket.on (network.js) and ball.js
    */
    this.ready = false;
    this.started = false;
    this.first = false;

  }


  /**
   * move and draw all the components (paddles, ball)
   * use the requestionAnimationFrame call this loop method (create a sort of smooth animation with multiples calls)
   */
  moveAndDraw(){
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

    this.paddle.move();
    this.paddle.draw();

    this.paddle2.move();
    this.paddle2.draw();

    this.ball.move();
    this.ball.draw();
    this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));

  }

  /**
   * end animationframe, delete the canvas content and display a "game over" screen
   */
  endGame(){
    if(this.started){
      window.cancelAnimationFrame(this.raf);
      this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.canvas.getContext("2d").drawImage(this.endImage, 0, 0, this.canvas.width, this.canvas.height);
    }
  }


  /**
   * keyboard event to move the left paddle with keyboard press
   * every press call the the method "moveY" to moveUp or Down and "update" to emit the new paddle position to all the connected clients
   * SPACE is used by the first player to start the game
   * (Game need to be ready & not started)
   */
  keyDownActionHandler(event) {
  switch (event.key) {
        case "ArrowDown":
        case "Down":
            this.paddle.moveDown();
            this.network.updatepaddle();
            break;
        case "ArrowUp":
        case "Up":
            this.paddle.moveUp();
            this.network.updatepaddle();
            break;
        case " ":
        case "Space":
        if(this.ready && !this.started && this.first){
          this.network.startBall();
          this.started = true;
        }
          break;
        default: return;
    }
    event.preventDefault();
  }
  
  /**
  * theses 2 methods update the HTML span to display in real time the current score of the players
  */
  updateScorePlayer1(){
    this.scorePlayer1++;
    let span = document.getElementById("player1_score");
    span.innerText = this.scorePlayer1;
  }

  updateScorePlayer2(){
    this.scorePlayer2++;
    let span = document.getElementById("player2_score");
    span.innerText = this.scorePlayer2;
  }

  /**
   * reset the HTML span of the players scoreboard
   */
  resetScore(){
    this.scorePlayer1 = 0;
    this.scorePlayer2 = 0;

    let span1 = document.getElementById("player1_score");
    span1.innerText = this.scorePlayer1;
    let span2 = document.getElementById("player2_score");
    span2.innerText = this.scorePlayer2;
  }

}
