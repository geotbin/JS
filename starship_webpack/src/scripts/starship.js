import Mobile from "./mobile.js"


export default class Starship extends Mobile {
  constructor(img, dx, dy, thecanvas) {
    super(0,(thecanvas.height)/2, dx, dy, img, thecanvas);
    this.moving = undefined;
    this.draw();
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
    /*starship move to left*/
    if (this.moving == "LEFT") {
        this.moving = undefined;
        this.x = Math.max(0, this.x - 10);
    }
    /*starship move to right*/
    if (this.moving == "RIGHT") {
      this.moving = undefined;
      this.x = Math.min(this.canvas.width - this.img.width, this.x + this.dx);
      this.draw();
    }
    /*starship move up*/
    if (this.moving == "UP") {
      this.moving = undefined;
      this.y = Math.max(0, this.y - 10);
    }
    /*starship move down*/
    if (this.moving == "DOWN") {
      this.moving = undefined;
      this.y = Math.min(this.canvas.height - this.img.height, this.y + this.dy);
    }
  }

}
