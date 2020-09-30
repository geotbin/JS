import Mobile from "./mobile.js"

export default class Shoot extends Mobile {
  constructor(img, x, dy, thecanvas, game){
    super(game.starship.x + game.starship.img.height, game.starship.y + (game.starship.img.width/3)+x, 7, dy, img, thecanvas);
    this.draw();
    this.game = game;
  }

  move(){
    super.move();
    if(this.isOutOfMap()){
      this.game.removeBullet(this);
    } else {
      this.x += this.dx;
      this.y += this.dy;
    }
  }

  isOutOfMap(){
    if(this.x > this.canvas.width) {
      return true;
    } else {
      return false;
    }
  }

}
