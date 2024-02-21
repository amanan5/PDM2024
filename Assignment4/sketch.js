let cherry, bgImage, moveAni, squishAni;
let cherrySprites = [];
let score = 0;
let gameTime = 30;
let startTime;
let timerIsDone = false;
let allCherries;
let rotationAngles = [0, 90, 180, 270];
let topWall, bottomWall, leftWall, rightWall;
let gameState = "start";

function preload() {
  bgImage = loadImage("images/background.jpeg");

  for (let i = 0; i < 4; i++) {
    cherrySprites[i] = loadImage("images/cherry" + i + ".png");
  }
}

function setup() {
  createCanvas(800, 800);
  score = 0;
  gameTime = 30;
  timerIsDone = false;
  startTime = 0;
  gameState = "start";
  walls();
  allCherries = new Group();
}

function draw() {
  background(bgImage);

  if (gameState === "start") {
    startScreen();
    if (mouseIsPressed) {
      moreCherries(60);
      gameState = "play";
      startTime = millis();
    }
  } else if (gameState === "play") {
    timer();
        

    allCherries.forEach(function(cherry){
      // this part isn't working properly. not all sprites are moving
      if (cherry.rotation === 0) {
        cherry.move("up", 5, 80000);
      } else if (cherry.rotation === 90) {
        cherry.move("right", 5, 80000);
      } else if (cherry.rotation === 180) {
        cherry.move("down", 5, 80000);
      } else if (cherry.rotation === 270) {
        cherry.move("left", 5, 80000);
      }
    });
    
    	allCherries.overlap(allCherries)

    allCherries.collides(topWall, teleBot);
    allCherries.collides(bottomWall, teleTop);
    allCherries.collides(leftWall, teleRight);
    allCherries.collides(rightWall, teleLeft);

    allCherries.forEach(function (e) {
      if (e.mouse.pressing()) {
        squish(e);
      }
    });

    push();
    textSize(20);
    text(`Seconds Ellapsed: ${gameTime} / 30`, 30, 40); //time
    text(`Cherries Squished: ${score}`, 30, 70); //score
    pop();

    if (timerIsDone === true) {
      allSprites.remove();
      gameState = "end";
    }
  } else if (gameState === "end") {
    endScreen();
    if (keyIsPressed) {
      if (keyCode === 13) {
        setup();
      }
    }
  }
}

function moreCherries(num) {
  for (let i = 0; i < num; i++) {
    cherry = new Sprite(random(10, width - 10), random(10, height - 12), 50, 50);

    squishAni = cherry.addAnimation("squish", cherrySprites[3]);
    cherry.rotation = floor(random(rotationAngles));

    moveAni = cherry.addAnimation(
      "move",
      cherrySprites[0],
      cherrySprites[1],
      cherrySprites[0],
      cherrySprites[2]
    );

    moveAni.frameDelay = 6;
    cherry.scale = 0.5;

    cherry.isSquished = false;
    allCherries.add(cherry);
    cherry.overlaps(allCherries);
    cherry.rotation = floor(random(rotationAngles));
  }
}

function timer() {
  gameTime = int((millis() - startTime) / 1000);
  if (gameTime > 30) {
    timerIsDone = true;
  }
  return gameTime;
}

function startScreen() {
  let startText = `Click the cherrys to clear the table!\n Squish as many as possible in 30 seconds!`;
  push();
  stroke(0);
  strokeWeight(3);
  fill("gray");
  rect(width / 2 - 300, height / 2 - 100, 600, 200);
  strokeWeight(0);
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text(startText, width / 2, height / 2);
  pop();
}
function endScreen() {
  let endText = `Time is up!\nYou squished ${score} cherries, but there are still more!\nPress Return to play again!`;
  push();
  stroke(0);
  strokeWeight(3);
  fill("gray");
  rect(width / 2 - 300, height / 2 - 100, 600, 200);
  strokeWeight(0);
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text(endText, width / 2, height / 2 - 25);
  pop();
}

function walls() {
  topWall = new Sprite(width / 2, -100, width, 50);
  bottomWall = new Sprite(width / 2, height + 100, width, 50);
  leftWall = new Sprite(-100, height / 2, 50, height);
  rightWall = new Sprite(width + 100, height / 2, 50, height);

  topWall.collider = "static";
  bottomWall.collider = "static";
  leftWall.collider = "static";
  rightWall.collider = "static";
}

function squish(item) {
  if (item.isSquished === false) {
    item.isSquished = true;
    item.ani = "squish";
    item.vel.x = 0;
    item.vel.y = 0;
    item.life = 60;
    score++;
  }
  if (allCherries.size() < 1) {
    moreCherries(random(5, 30));
  }
}

function teleTop(cherry) {
  cherry.y = -10;
  cherry.rotation = 180;
  cherry.move("down", 5, 80000);
}

function teleBot() {
  cherry.y = height + 10;
  cherry.rotation = 0;
  cherry.move("up", 5, 80000);
}

function teleLeft() {
  cherry.x = -10;
  cherry.rotation = 90;
  cherry.move("right", 5, 80000);
}

function teleRight() {
  cherry.x = width + 10;
  cherry.rotation = 270;
  cherry.move("left", 5, 80000);
}
