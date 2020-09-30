import Mobile from "./mobile.js"

export default class Ball extends Mobile {

  constructor(img, thecanvas, game) {
    super(thecanvas.width/2,thecanvas.height/2, 0, 0, img, thecanvas);
    // draws the ball when it is created
    this.draw();

    // game shortcuts
    this.game = game;
    this.paddle = this.game.paddle;
    this.paddle2 = this.game.paddle2;
    this.canvas = thecanvas;
  }

  // set the ball in the middle of the canva (x/y)
  setMiddleCanva(){
    this.setX(this.canvas.width/2);
    this.setY(this.canvas.height/2);
    this.setDx(0);
    this.setDy(0);
  }

  // change dx/dy of the ball
  changeBallSpeed(dx, dy){
    this.setDx(dx);
    this.setDy(dy);
  }

  // change ball speed to 4/1 when first player start
  start(){
    this.setMiddleCanva();
    this.changeBallSpeed(4,1);
  }
  // change ball speed to 0/0 when ball is out of map
  stop(){
    this.changeBallSpeed(0,0);
  }


  /**
   * main method to move the ball, check the hitboxes and the walls
   * the method is repeatedly used in moveAndDraw method.
   */
  move(){

    //if the ball hit the top/bottom wall, inverse the y direction
    if(this.y + this.dy > this.canvas.height - this.img.height || this.y + this.dy < 0) {
        this.dy = -this.dy;
    }


    /**
     * hitboxe of the left paddle (current player)
     * Normally, the paddle is divided in differents parts to increase the ball rebound.
     * Unfortunatelly, i don't have implement this function yet.
     */
    if(
      this.x > this.paddle.x &&
      this.x <= (this.paddle.x + this.paddle.img.width) &&
      this.y + this.img.height > this.paddle.y &&
      this.y <= (this.paddle.y + this.paddle.img.height)){

        // x + 2 to avoid lags into the paddle
        this.x = this.x + 2 ;
        this.dx = -this.dx;
        this.dy = this.dy;


    } // fin if left paddle

  /**
   * hitboxe of the right paddle (current player)
   * Normally, the paddle is divided in differents parts to increase the ball rebound.
   * Unfortunatelly, i don't have implement this function yet.
   */
  if(
    this.x > this.paddle.x && this.x + this.img.width > (this.paddle2.x) &&
    this.x +this.img.width <= (this.paddle2.x + this.paddle2.img.width) &&
    this.y + this.img.height > (this.paddle2.y) &&
    this.y + this.img.height <= (this.paddle2.y + this.paddle2.img.height)){

      // x - 2 to avoid lags into the paddle
      this.x = this.x - 2;
      this.dx = -this.dx;
      this.dy = this.dy;
  } // fin du right paddle

  // add the ball direction speed to the ball x/y position (to create move animation)
  this.x += this.dx;
  this.y += this.dy;

  /**
   * This part is reserved to the FIRST player
   * When the ball reach a part of the screen, it will send an update signal to all the connected players (except the sender)
   * It's used to reduce the network lag / different ball position between the players
   */
  if(this.game.first){
    // x position reached: update between 20% and 40% of the screen / 60% and 80%
    // y position reached: update betweend 25% and 75% of the screen
    if(this.x + this.dx >= this.canvas.width*0.2 && this.x + this.dx <= this.canvas.width*0.40 || this.x + this.dx >= this.canvas.width*0.6 && this.x + this.dx <= this.canvas.width*0.8 || this.y + this.dy >= this.canvas.height*0.25 && this.y + this.dy <= this.canvas.height*0.75){
        this.game.network.update();
    }

    /**
     * these 2 if are used to stop the ball and update score when the ball is out of map
     * when the ball reach the left wall, it will give a point for the opponent
     * when the ball reach the right wall, it will give a point for the current player
     */
    if(this.x + this.dx + this.img.width > this.canvas.width) {
      this.game.network.updateScorePlayer1();
      this.game.network.stopBall()
    }

    if(this.x + this.dx + (this.img.width/2)< 0){
      this.game.network.updateScorePlayer2();
      this.game.network.stopBall();
    }
  }

  }


}
