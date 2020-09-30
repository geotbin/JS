export default class Mobile {
  constructor(x,y, dx, dy, img, thecanvas) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.canvas = thecanvas;
      this.context = thecanvas.getContext("2d");
      // mobile img (could be ball / paddle)
      this.img = new Image();
      this.img.src = img;
  }



  getY(){
    return this.y;
  }

  setY(y){
    this.y = y;
  }
  
  getX(){
    return this.x;
  }

  setX(x){
    this.x = x;
  }

  
  getDx(){
    return this.dx;
  }

  setDx(dx){
    this.dx = dx;
  }


  getDy(){
    return this.dy;
  }

  setDy(dy){
    this.dy = dy;
  }

  /**
   * draw img on canvas (with x/y position)
   * used in the moveAndDraw method (pong.js)
   */
  draw(){
    this.context.drawImage(this.img, this.x, this.y);
  }

  move() {
  }
}
