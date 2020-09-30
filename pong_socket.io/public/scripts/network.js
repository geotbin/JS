
export default class Network {

  constructor(game, ball) {

    /**
     * socket is used to connect to server (bidirectionnal data)
     * options io() avoid f5 refresh problems (multiple connects before disconnect)
     */
  	this.socket = io({transports: ['websocket'], upgrade: false});
  	this.game = game;
    this.middleScreen = (game.canvas.width/2);

    /**
     * 2 players paddles
     * the first one is always for the current player (on the left)
     * the second is for the opponent (on the right)
     */
  	this.paddle = this.game.paddle;
    this.paddle2 = this.game.paddle2;
    this.ball = ball;

    // setup init all the socket.on for the client
    this.setup(this);

  }

setup(self){

  // display current info on the console div
  this.socket.on('infos', function(data) {
  	var consoleInfos = document.getElementById("console");
  	consoleInfos.innerText = '\n' + data.data;

  });

  // if an error disconnect is received, the opponent has a network problem or disconnected so it's end the game
  this.socket.on('error_disconnect', function(data) {
  	self.game.endGame();
    self.started = false;
  });

  // if the current socket receive first signal, give him the first attribute (permitt to start the game)
  this.socket.on('first', function() {
    self.game.first = true;
    // info
    var consoleInfos = document.getElementById("console");
    consoleInfos.innerText += '\nYou are the first player, SPACE to begin';

  });

  /**
   * ready is used to inform the clients about the numbers of connected players
   * READY = 2 players connected
   * NOT READY = <2 players connected
   */
  this.socket.on('ready', function(data) {
  	self.game.ready = true;
  });

  this.socket.on('not_ready', function(data) {
  	self.game.ready = false;
  });


  /**
   * this method update the opponent paddle y axis on the current player page
   * when the signal is sent by the opponent
   */
  this.socket.on('updatepaddle', function(data) {
    var y = parseInt(data.paddle_y);
    self.paddle2.setY(y);
  });

    /**
   * this method update all the infos about ball (x, y, directions speed), opponent paddle on the current player page
   * when the signal is sent by the opponent
   * Only the FIRST player can sent this signal
   */
  this.socket.on('update', function(data) {
    // parse data str to int
    var y = parseInt(data.paddle_y);
    var ball_x = parseInt(data.ball_x);
    var ball_y = parseInt(data.ball_y);
    var ball_dx = parseInt(data.ball_dx);
    var ball_dy = parseInt(data.ball_dy);
    // update 
    self.paddle2.setY(y);
    self.ball.setX(ball_x);
    self.ball.setY(ball_y);
    self.ball.changeBallSpeed(ball_dx, ball_dy);
  });

  /**
   * this method update the ball (x, y, directions speed) on the current player page
   * when the FIRST player decide to start the game
   * Only the FIRST player can sent this signal
   */

  this.socket.on('start', function(data) {
  	self.game.started = true;
    var ball_dx = parseInt(data.ball_dx);
    var ball_dy = parseInt(data.ball_dy);
    var paddle_y = parseInt(data.paddle_y)
    self.paddle2.setY(paddle_y);
    self.ball.setMiddleCanva();
    self.ball.changeBallSpeed(ball_dx, ball_dy);
  });


    /**
   * this method stop the ball (x, y, directions speed) on the current player page
   * when the FIRST player notice that the ball has reached out of map.
   * It update the ball position and speed (speed = 0)
   * Only the FIRST player can sent this signal
   */
  this.socket.on('stop', function(data) {
    self.game.started = false;
    // parse data str -> int
    var paddle_y = parseInt(data.paddle_y);
    var ball_x = parseInt(data.ball_x);
    var ball_y = parseInt(data.ball_y);
    var ball_dx = parseInt(data.ball_dx);
    var ball_dy = parseInt(data.ball_dy);
    // update
    self.ball.setX(ball_x);
    self.ball.setY(ball_y);
    self.paddle2.setY(paddle_y);
    self.ball.changeBallSpeed(ball_dx, ball_dy);
  });

  /**
   * Update the player score when a player scored (ball out of map)
   * Only the FIRST player can sent this signal
   */
  this.socket.on('pointPlayer1', function(){
    self.game.updateScorePlayer1();
    console.log("ok");
  });
  this.socket.on('pointPlayer2', function(){
    self.game.updateScorePlayer2();
  });

  // reset the score from scoretab, sent by the server
  this.socket.on('reset_score', function(){
    self.game.resetScore();
  });

 }

 /**
  * send paddle y to all the connected sockets except the sender
  * cf. socket.on('updatepaddle')
  */
  updatepaddle(){
    var data = {
      "paddle_y" : this.paddle.getY()
    };
    this.socket.emit('updatepaddle', data);
  }

 /**
  * send infos about ball/paddle to all the connected sockets except the sender
  * cf. socket.on('update')
  * sent by the first player
  */
  update(){
    var data = {
      "paddle_y" : this.paddle.getY(),
      "ball_x" : (this.middleScreen + (this.middleScreen - this.ball.getX())),
      "ball_y" : this.ball.getY(),
      "ball_dx" : -this.ball.getDx(),
      "ball_dy" : this.ball.getDy()
    };
    this.socket.emit('update', data);
  }

  /**
  * send start signal all the connected sockets except the sender
  * cf. socket.on('start')
  * sent by the first player
  */
  startBall(){
    this.ball.start();
    this.game.started = true;
    var data = {
      "paddle_y": this.paddle.getY(),
      "ball_dx" : -this.ball.getDx(),
      "ball_dy" : this.ball.getDy()
    };
    this.socket.emit('start', data);
  }

  /**
  * send stop signal all the connected sockets except the sender
  * cf. socket.on('start')
  * sent by the first player
  */
  stopBall(){
    this.ball.stop();
    this.game.started = false;
    var data = {
      "ball_x" : (this.middleScreen + (this.middleScreen - this.ball.getX())),
      "ball_y" : this.ball.getY(),
      "ball_dx" : -this.ball.getDx(),
      "ball_dy" : -this.ball.getDy()
    };
  this.socket.emit('stop', data);
  }

  /**
   * call the update methods in the game script and emit to all the connected users (except the sender)
   *  that the score change.
   */
  updateScorePlayer1(){
    this.game.updateScorePlayer1();
    this.socket.emit('pointPlayer2');
  }
  updateScorePlayer2(){
    this.game.updateScorePlayer2();
    this.socket.emit('pointPlayer1');
  }





}