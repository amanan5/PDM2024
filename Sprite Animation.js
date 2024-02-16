let spelunkyCharacter, greenCharacter;
let array = [];


function preload() {
  //Loads all sprite sheets
  spelunky = loadImage("../Assets/Spelunky.png");
  greenChar = loadImage("../Assets/Green.png");
  
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // Fixes scale(-1) issue
    imageMode(CENTER);

    // Top Layer
    greenCharacter = new Character(greenChar, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
    
    // Bottom Layer
    spelunkyCharacter = new Character(spelunky, random(50, window.innerWidth-50), random(window.innerHeight/4 - 30, window.innerHeight - 40), random(2, 5));
   
    let choices = [35, 70]
    for(let i = 0; i < 20; i++) {
      array[i] = new Cloud(random(0, window.innerWidth), 70, random(1, 2));
    }
    for(let i = 20; i < 40; i++) {
      array[i] = new Cloud(random(0, window.innerWidth), 35, random(1, 2));
    }
    
}

function draw() {
  background(225);
  
  
  greenCharacter.draw();
  spelunkyCharacter.draw();

  for(let i = 0; i < 40; i++) {
    array[i].draw();
  }
}

function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    greenCharacter.go(1);
    spelunkyCharacter.go(1);

  } else if (keyCode == LEFT_ARROW) {
    greenCharacter.go(-1);
    spelunkyCharacter.go(-1);
   }
}

function keyReleased() {
  greenCharacter.stop();
  spelunkyCharacter.stop();
}

class Cloud {

  draw() {
    fill(0);
    noStroke();
    
  }


}


class Character {
  constructor(character, x, y, speed) {
    this.character = character;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
    this.speed = speed;
  }

  draw() {
    push();
    translate(this.x,this.y);
    scale(this.facing, 1);

    if(this.move == 0) {
      image(this.character, 0, 0, 80, 80, 0, 0, 80, 80);
    } else {
      image(this.character, 0, 0, 80, 80, 80 * (this.sx + 1), 0, 80, 80);
    }


    if(frameCount % (7 - (round(this.speed - 2))) == 0) {
      this.sx = (this.sx + 1) % 8;
    }

    if(this.x > window.innerWidth) {
      this.move = -(this.move);
      this.facing = -(this.facing);
    }

    if(this.x < 0) {
      this.move = -(this.move);
      this.facing = -(this.facing);
    }

    this.x += this.speed * this.move;
    pop();
  }

  go(direction) {
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }

  stop() {
    this.move = 0;
  }
}