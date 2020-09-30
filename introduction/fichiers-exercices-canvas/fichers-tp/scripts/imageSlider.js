
var ImageSlider = function(canvas){
  this.canvas = canvas;
  this.leftIm;
  this.rightIm;
  this.frontpos;
  this.context = this.canvas.getContext("2d");

}


  ImageSlider.prototype.initImages = function(img1, img2) {
    this.leftIm = new Image();
    this.rightIm = new Image();

    this.rightIm.addEventListener('load',
          this.leftIm.addEventListener('load',
              this.init.bind(this)
            )
          );
          this.leftIm.src = img1;

    this.rightIm.src = img2;
  }




  ImageSlider.prototype.init = function() {
    this.canvas.height = this.leftIm.height;
    this.canvas.width = this.leftIm.width;
    this.frontpos = this.canvas.width/2;
    this.dessine();
    this.canvas.addEventListener("keydown",keyAction.bind(this));
  }



  ImageSlider.prototype.dessine = function() {


    this.context.drawImage(this.leftIm, 0, 0, this.frontpos, this.canvas.height,
                                   0, 0, this.frontpos, this.canvas.height);

    this.context.drawImage(this.rightIm, this.frontpos, 0, this.canvas.width, this.canvas.height,
                                  this.frontpos, 0, this.canvas.width, this.canvas.height);

    this.context.fillRect(this.frontpos, 0, 5, this.canvas.height);
  }


  var keyAction = function(event) {
     // on peut placer ici du code qui est exécuté dans tous les cas avant le traitement des touches
     switch (event.key) {
        case "ArrowLeft":
        case "Left":
          this.frontpos -= 5;
        break;
        case "ArrowRight":
        case "Right":
           this.frontpos += 5;
        break;
        case "X":
        case "x":
           this.frontpos = this.canvas.width/2;
        break;
        default: return;
     }
     this.dessine();
     // on peut aussi écrire ici du code exécuté dans tous les cas après le traitement des touches
     event.preventDefault();   // pour désactiver l'action éventuelle par défaut liée à la touche pressée
  }
