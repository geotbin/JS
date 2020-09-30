
class Ball{
  constructor(thecanvas){
      this.canvas = thecanvas;
      this.x = Math.floor(Math.random() * thecanvas.height);
      this.y = 0;
      this.dx = Math.floor(Math.random() * 4+1);
      this.dy = Math.floor(Math.random() * 4+1);
      this.img = new Image();
      this.img.src = "images/balle.png";
      this.context = this.canvas.getContext("2d");
  }

  move(){
    if(this.x + this.dx > this.canvas.width - this.img.width || this.x + this.dx < 0) {
  			this.dx = -this.dx;
  	}
  	if(this.y + this.dy > this.canvas.height - this.img.height || this.y + this.dy < 0) {
  			this.dy = -this.dy;
  	}

  	this.x += this.dx;
  	this.y += this.dy;
  }

  draw(){
    this.context.drawImage(this.img, this.x, this.y);
  }


  collisionWith(obstacle){
    return obstacle.isInside(this.x, this.y);
  }


}


class AnimationBall{

  constructor(thecanvas){
    this.canvas = thecanvas;
    this.context = this.canvas.getContext("2d");
    this.start = false;
    this.raf = undefined;
    this.balls = Array();
  }

  moveAndDraw(){
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

    this.balls.forEach(
      balle => {
        balle.move();
        balle.draw();
      });

    this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
  }

  startAnimation(){
    this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
  }

  stopAnimation(){
    window.cancelAnimationFrame(this.raf);
  }

  checkAnimation(){
    if(this.start == false){
      this.startAnimation();
      this.start = true;
    } else {
      this.stopAnimation();
      this.start = false;
    }
  }

  addBall(){
    let newBalle = new Ball(this.canvas);
    this.balls.push(newBalle);

    this.balls.forEach(
      balle => {
        balle.draw();
      });
  }

}


class AnimationWithObstacle extends AnimationBall{
  constructor(thecanvas, obstacle){
    super(thecanvas);
    this.obstacle = obstacle;
    this.drawObstacle();
  }

  moveAndDraw(){
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

    this.obstacle.move();
    this.drawObstacle();

    this.balls.forEach(
      balle => {
        balle.move();
        balle.draw();
      }
    );

    this.balls = this.balls.filter(balle => !balle.collisionWith(this.obstacle));
    this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
  }

  drawObstacle(){
    //this.context.fillStyle = "rgb(0,255,0)";
    // this.context.fillRect(this.obstacle.x, this.obstacle.y, this.obstacle.width, this.obstacle.height);
    this.context.drawImage(this.obstacle.img, this.obstacle.x, this.obstacle.y);

  }

  keyDownActionHandler(event) {
  switch (event.key) {
        case "ArrowLeft":
        case "Left":
            console.log("received left key");
            this.obstacle.moveLeft();
            break;
        case "ArrowRight":
        case "Right":
            console.log("received right key");
            this.obstacle.moveRight();
            break;
        case "ArrowDown":
        case "Down":
            console.log("received down key");
            this.obstacle.moveDown();
            break;

        case "ArrowUp":
        case "Up":
            console.log("received up key");
            this.obstacle.moveUp();
            break;


        default: return;
    }
    event.preventDefault();
  }

}

class Obstacle {

  constructor(x,y, thecanvas) {
      this.img = new Image();
      this.img.src = "images/example-r.png";
      this.x = x;
      this.y = y;
      this.moving = undefined;
      this.canvas = thecanvas;
  }

  isInside(ballX, ballY) {
    return (ballX >= this.x && ballX <= (this.x + this.img.width) && ballY >= this.y && ballY <= (this.y + this.img.height));
  }

  moveLeft() {
    this.moving = "LEFT";
  }

  moveRight() {
    this.moving = "RIGHT";
  }

  moveUp() {
    this.moving = "UP";
  }

  moveDown() {
    this.moving = "DOWN";
  }


  move() {

    if (this.moving == "LEFT") {
        this.moving = undefined;
        this.x = Math.max(0, this.x - 10);
    }

    if (this.moving == "RIGHT") {
      this.moving = undefined;
      this.x = Math.min(this.canvas.width - this.img.width, this.x + 10);
    }

    if (this.moving == "UP") {
      this.moving = undefined;
      this.y = Math.max(0, this.y - 10);
    }

    if (this.moving == "DOWN") {
      this.moving = undefined;
      this.y = Math.min(this.canvas.height - this.img.height, this.y + 10);
    }
  }

}


let canvas = document.getElementById("terrain");
let obstacle = new Obstacle(75,75, canvas);
//let animation = new AnimationBall(canvas);
let animation = new AnimationWithObstacle(canvas, obstacle);

document.getElementById("stopStartBall").onclick = function() {
  animation.checkAnimation();
}

document.getElementById("addBall").onclick = function() {
  animation.addBall();
}

window.addEventListener('keydown', animation.keyDownActionHandler.bind(animation));
