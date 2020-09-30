import Starship from "./starship.js"
import Saucer from "./saucer.js"
import Shoot from "./shoot.js"

export default class Game{
  constructor(thecanvas){
    this.starship = new Starship("images/vaisseau-ballon-petit.png", 10, 10, thecanvas);
    this.canvas = thecanvas;
    this.context = thecanvas.getContext("2d");
    this.raf = undefined;
    this.start = false;
    this.end = false;
    this.saucers = Array();
    this.bullets = Array();
    this.score = 0;
    this.infiniteGame = false;
    this.infiniteGameInterval = undefined;
    this.beastMode = false;
    this.starship.draw();
  }

  addSaucer(){
    if(this.saucers.length <= 10)
      this.saucers.push(new Saucer("images/flyingSaucer-petit.png",this.canvas, this));
  }

  removeSaucer(s){
    this.saucers = this.saucers.filter(saucer => saucer !== s);
  }

  infiniteSaucers() {
      this.infiniteGame = !this.infiniteGame;

      if (this.infiniteGame) {
          this.infiniteGameInterval = window.setInterval(() => this.addSaucer(), 750);
      } else {
          clearInterval(this.infiniteGameInterval);
      }
  }

  addBullet(){

    if(this.beastMode){
      this.bullets.push(new Shoot("images/tir.png", -5,-0.5, this.canvas, this));
      this.bullets.push(new Shoot("images/tir.png", 0, 0, this.canvas, this));
      this.bullets.push(new Shoot("images/tir.png", 5, 0.5, this.canvas, this));
    } else {
      if(this.bullets.length <= 15){
      this.bullets.push(new Shoot("images/tir.png", 0, 0, this.canvas, this));
      }
    }
  }

  removeBullet(b){
    this.bullets = this.bullets.filter(bullet => bullet !== b);
  }

  changeScoreWhenSaucerIsOutOfMap(){
    this.score -= 1000;

    if(this.score < -2000){
      this.end = true;
    }
    this.updateScoreSpan();
  }

  beastMod(){
    if(this.beastMode){
      this.beastMode = false;
      document.getElementById("beastMode").innerText = "BeastMode";
    } else {
      this.beastMode = true;
      document.getElementById("beastMode").innerText = "Normal";
    }
  }

  endGame(){
    clearInterval(this.infiniteGameInterval);
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.context.font = "30px Arial";
    this.context.fillStyle = 'white';
    this.context.fillText("Game Over, refresh to try again", this.canvas.height/2, 100);
  }

  changeScoreWhenSaucerExplode(){
    this.score += 200;
    this.updateScoreSpan();
  }

  updateScoreSpan(){
    let span = document.getElementById("score");
    span.innerText = this.score;
  }

  moveAndDraw(){
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

    this.starship.move();
    this.starship.draw();

    this.saucers.forEach(
      saucer => {
        saucer.move();
        saucer.draw();
        saucer.isCollisionWith(this.starship, this);
      });

    this.bullets.forEach(
      bullet => {
        bullet.move();
        bullet.draw();
      });

      this.bullets.forEach(
        bullet => {
          this.saucers.filter(saucer => !saucer.isCollisionWith(bullet, this));

class Game{
  constructor(thecanvas){
    this.starship = new Starship("images/vaisseau-ballon-petit.png", 10, 10, thecanvas);
    this.canvas = thecanvas;
    this.context = thecanvas.getContext("2d");
    this.raf = undefined;
    this.start = false;
    this.end = false;
    this.saucers = Array();
    this.bullets = Array();
    this.score = 0;
    this.infiniteGame = false;
    this.infiniteGameInterval = undefined;
    this.beastMode = false;
    this.starship.draw();
  }

  addSaucer(){
    if(this.saucers.length <= 10)
      this.saucers.push(new Saucer("images/flyingSaucer-petit.png",this.canvas, this));
  }

  removeSaucer(s){
    this.saucers = this.saucers.filter(saucer => saucer !== s);
  }

  infiniteSaucers() {
      this.infiniteGame = !this.infiniteGame;

      if (this.infiniteGame) {
          this.infiniteGameInterval = window.setInterval(() => this.addSaucer(), 750);
      } else {
          clearInterval(this.infiniteGameInterval);
      }
  }

  addBullet(){

    if(this.beastMode){
      this.bullets.push(new Shoot("images/tir.png", -5,-0.5, this.canvas, this));
      this.bullets.push(new Shoot("images/tir.png", 0, 0, this.canvas, this));
      this.bullets.push(new Shoot("images/tir.png", 5, 0.5, this.canvas, this));
    } else {
      if(this.bullets.length <= 15){
      this.bullets.push(new Shoot("images/tir.png", 0, 0, this.canvas, this));
      }
    }
  }

  removeBullet(b){
    this.bullets = this.bullets.filter(bullet => bullet !== b);
  }

  changeScoreWhenSaucerIsOutOfMap(){
    this.score -= 1000;

    if(this.score < -2000){
      this.end = true;
    }
    this.updateScoreSpan();
  }

  beastMod(){
    if(this.beastMode){
      this.beastMode = false;
      document.getElementById("beastMode").innerText = "BeastMode";
    } else {
      this.beastMode = true;
      document.getElementById("beastMode").innerText = "Normal";
    }
  }

  endGame(){
    clearInterval(this.infiniteGameInterval);
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.context.font = "30px Arial";
    this.context.fillStyle = 'white';
    this.context.fillText("Game Over, refresh to try again", this.canvas.height/2, 100);
  }

  changeScoreWhenSaucerExplode(){
    this.score += 200;
    this.updateScoreSpan();
  }

  updateScoreSpan(){
    let span = document.getElementById("score");
    span.innerText = this.score;
  }

  moveAndDraw(){
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

    this.starship.move();
    this.starship.draw();

    this.saucers.forEach(
      saucer => {
        saucer.move();
        saucer.draw();
        saucer.isCollisionWith(this.starship, this);
      });

    this.bullets.forEach(
      bullet => {
        bullet.move();
        bullet.draw();
      });

      this.bullets.forEach(
        bullet => {
          this.saucers.filter(saucer => !saucer.isCollisionWith(bullet, this));
        }
      )

    if(!this.end){
      this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
    } else {
      this.endGame();
    }
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


  keyDownActionHandler(event) {
  switch (event.key) {
        case "ArrowLeft":
        case "Left":
            this.starship.moveLeft();
            break;
        case "ArrowRight":
        case "Right":
            this.starship.moveRight();
            break;
        case "ArrowDown":
        case "Down":
            this.starship.moveDown();
            break;

        case "ArrowUp":
        case "Up":
            this.starship.moveUp();
            break;
        case "KeyF":
        case "f":
            this.addBullet();
            break;

        default: return;
    }
    event.preventDefault();
  }

}      }
      )

    if(!this.end){
      this.raf = window.requestAnimationFrame(this.moveAndDraw.bind(this));
    } else {
      this.endGame();
    }
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


  keyDownActionHandler(event) {
  switch (event.key) {
        case "ArrowLeft":
        case "Left":
            this.starship.moveLeft();
            break;
        case "ArrowRight":
        case "Right":
            this.starship.moveRight();
            break;
        case "ArrowDown":
        case "Down":
            this.starship.moveDown();
            break;

        case "ArrowUp":
        case "Up":
            this.starship.moveUp();
            break;
        case "KeyF":
        case "f":
            this.addBullet();
            break;

        default: return;
    }
    event.preventDefault();
  }

}
