import Mobile from "./mobile.js"

export default class Paddle extends Mobile {
  constructor(img, x, y, thecanvas) {
    super(x,y, 10, 10, img, thecanvas);
    this.moving = undefined;
  }

  moveUp() {
    this.moving = "UP";
  }

  moveDown() {
    this.moving = "DOWN";
  }

  /**
   * Move the current paddle y with the specific direction
   * cf. keyDownActionHandler() (pong.js)
   */

  move() {

    if (this.moving == "UP") {
      this.moving = undefined;
      this.y = Math.max(0, this.y - 10);
    }

    if (this.moving == "DOWN") {
      this.moving = undefined;
      this.y = Math.min(this.canvas.height - this.img.height, this.y + this.dy);
    }
  }

}
