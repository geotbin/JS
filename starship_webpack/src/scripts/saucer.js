import Mobile from "./mobile.js"

export default class Saucer extends Mobile {

  constructor(img, thecanvas, game) {
    super(thecanvas.width-100,Math.floor(Math.random() * (thecanvas.height-100)), 4, 0, img, thecanvas);
    this.draw();
    this.game = game;
    this.killed = false;
  }

  move(){
    /*OutOfMap = out of the canvas*/
    if(this.isOutOfMap()){
      if(!this.killed){
            this.game.changeScoreWhenSaucerIsOutOfMap();
      }
      this.game.removeSaucer(this);
    } else {
      /*change direction (inverse with speed)*/
      this.x -= this.dx;
      this.y += this.dy;
    }
  }

  isOutOfMap(){
    if(this.x < 0 | this.y > this.canvas.height) {
      return true;
    }else{
      return false;
    }
  }

  isCollisionWith(shoot, game){
    if(shoot.x >= this.x &&
      shoot.x <= (this.x + this.img.width) &&
      shoot.y >= this.y &&
      shoot.y <= (this.y + this.img.height) && !this.killed){

      this.dx = 0;
      this.dy = 3;

      /*saucer fallioveBullet(shoot);
      this.game.chang animation*/
      this.killed = true;
      this.img = new Image();
      this.img.src = "images/flyingSaucer-petit-rotated.png";
      this.game.removeBullet(shoot);
      this.game.changeScoreWhenSaucerExplode();
      return true;

    } else {
      return false;
    }
  }
}
