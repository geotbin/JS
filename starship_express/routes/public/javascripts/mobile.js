export default class Mobile {
  constructor(x,y, dx, dy, img, thecanvas) {
      this.img = new Image();
      this.img.src = img;
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.canvas = thecanvas;
      this.context = thecanvas.getContext("2d");
  }

  draw(){
    this.context.drawImage(this.img, this.x, this.y);
  }

  move() {
  }
}
