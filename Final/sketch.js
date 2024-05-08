let serial;
let gameState;
let timer = 0;
let startTime;
let bgImage; 
let backgroundMusic;
let monsterMove = [];
let chefMove = [];
let guestImages = [];
let idleGuests = [];
let monsterLives = 3; // game starts with three lives
let isGameOver = false; // track if game is over

let monster = {
  x: 350,
  y: 200,
  speed: 3,
  animation: [],
  currentFrame: 0
};

let chef = {
  x: 100,
  y: 100,
  speed: 1.5,
  animation: [],
  currentFrame: 0
};

function preload() {
  bgImage = loadImage("assets/bg/bg.jpg");
  // load background music
  backgroundMusic = loadSound('assets/music/background.wav');
  // Load animations for monster and chef
  for (let i = 0; i < 23; i++) {
    monsterMove[i] = loadImage(`assets/spriteAni/move/monster/monster${i}.png`);
  }
  for (let i = 0; i < 11; i++) {
    chefMove[i] = loadImage(`assets/spriteAni/move/chef/chef${i}.png`);
  }
  // Load guest images
  for (let i = 0; i < 4; i++) {
    guestImages[i] = loadImage(`assets/spriteAni/idle/guest${i}.png`);
  }
}

function setup() {
  createCanvas(700, 400);
  gameState = "welcome";

  // Initialize monster and chef animations
  monster.animation = monsterMove;
  chef.animation = chefMove;

  // Setup idle guests
  for (let i = 0; i < 4; i++) {
    idleGuests.push({
      x: 100 + 150 * i,
      y: 300,
      img: guestImages[i]
    });
  }
  // initialize seiral connection
  serial = new p5.SerialPort(); // create instance of serial port library
  serial.open('COM4'); // open serial connection
  // add listeners for serial communication events
  serial.on('open', () => console.log('Serial Port is open'));
  serial.on('error', (err) => console.error('Serial Port error: ', err));
}

function draw() {
  background(bgImage);

  if (gameState === "welcome") {
      drawWelcomeScreen();
      if (backgroundMusic.isPlaying()) {
          backgroundMusic.stop();  // Stop the music if still playing
      }
  } else if (gameState === "gameplay") {
      if (startTime == null) {
          startTime = millis();
          if (!backgroundMusic.isPlaying()) {
              backgroundMusic.loop();  // Start the music in loop if not already playing
          }
      }
      timer = (millis() - startTime) / 1000;

      displayTimer();
      idleGuests.forEach(drawGuest);
      updateMonster();
      updateChef();
      drawCharacter(monster);
      drawCharacter(chef);

      // send current number of lives to Arduino
      serial.write(monsterLives + '\n');

      if (checkCollision() && !isGameOver) {
          monsterLives--; // Decrease lives
          if (monsterLives > 0) {
              // Reset positions or handle life loss
              resetPositions();
          } else {
              isGameOver = true;
              gameState = "gameOver";
              backgroundMusic.stop();  // Stop the music when game over
          }
      }
  } else if (gameState === "gameOver") {
      if (backgroundMusic.isPlaying()) {
          backgroundMusic.stop();  // Ensure music is stopped in game over
      }
      drawGameOverScreen();
  }
}

function updateMonster() {
  if (keyIsDown(LEFT_ARROW)) {
    monster.x -= monster.speed;
    monster.animation = monsterMove;
  } else if (keyIsDown(RIGHT_ARROW)) {
    monster.x += monster.speed;
    monster.animation = monsterMove;
  } else if (keyIsDown(UP_ARROW)) {
    monster.y -= monster.speed;
    monster.animation = monsterMove; 
  } else if (keyIsDown(DOWN_ARROW)) {
    monster.y += monster.speed;
    monster.animation = monsterMove;
  }

  monster.currentFrame = (monster.currentFrame + 1) % monster.animation.length;
}

function updateChef() {
  let dx = monster.x - chef.x;
  let dy = monster.y - chef.y;
  let angle = atan2(dy, dx);
  chef.x += chef.speed * cos(angle);
  chef.y += chef.speed * sin(angle);
  chef.currentFrame = (chef.currentFrame + 1) % chef.animation.length;
}

function drawCharacter(character) {
  let img = character.animation[floor(character.currentFrame)];
  image(img, character.x, character.y);
}

function drawGuest(guest) {
  image(guest.img, guest.x, guest.y);
}

function checkCollision() {
  // Simple AABB (Axis-Aligned Bounding Box) collision detection
  if (abs(monster.x - chef.x) < 50 && abs(monster.y - chef.y) < 50) {
      return true;
  }
  return false;
}

function resetPositions() {
  monster.x = 350; // Reset monster's position
  monster.y = 200;
  // Optionally reset the chef's position too, or add a delay
}

function displayTimer() {
  if (typeof timer !== "number" || isNaN(timer)) {
    timer = 0; // Reset timer if it's not a number
  }
  let timerText = `Time: ${timer.toFixed(2)}s`; // Now timer is guaranteed to be a number

  textSize(20);
  let calcTextWidth = textWidth(timerText) + 10; 
  let textHeight = textSize() + 5;

  fill('blue');
  rect(50 - 5, 25 - textHeight / 2, calcTextWidth, textHeight, 10);

  fill(255);
  text(timerText, 55, 35);
}

function drawWelcomeScreen() {
  textAlign(CENTER, CENTER);
  textSize(32);
  // background for text box
  let boxWidth = textWidth("Welcome to Kooky Nomster!") + 60; // width + padding
  let boxHeight = textSize() * 7; // lines of text + padding
  // draw box
  fill('blue'); // make it blue
  rect(width / 2 - boxWidth / 2, height / 2 - boxHeight / 2 + 10, boxWidth, boxHeight, 10); // center text position
  // add text 
  fill(255);
  text("Welcome to Kooky Nomster!", width / 2, height / 2);
  text("Click to start", width / 2, height / 2 + 40);
}

function drawGameOverScreen() {
  textAlign(CENTER, CENTER);
  textSize(32);
  
  // background for text box
  let boxWidth = textWidth("GAME OVER") + 60;
  let boxHeight = textSize() * 7; 
  fill('red');
  rect(width / 2 - boxWidth / 2, height / 2 - boxHeight / 2 + 10, boxWidth, boxHeight, 10);
  fill(255);
  text("GAME OVER!", width / 2, height / 2);
  text("Click to restart", width / 2, height / 2 + 40);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
  }
  console.log("Audio context resumed");

  if (gameState === "welcome" || gameState === "gameOver") {
      resetGame(); // Call reset function to ensure everything is set for a new game
      gameState = "gameplay";
      backgroundMusic.loop(); // Ensure music starts or restarts as needed
      console.log("Game state changed to gameplay, music started");
  }
}

function resetGame() {
  // Reset game-specific variables
  monsterLives = 3;
  monster.x = 350;
  monster.y = 200;
  monster.currentFrame = 0;
  chef.x = 100;
  chef.y = 100;
  chef.currentFrame = 0;
  timer = 0;
  startTime = null;
  gameState = "welcome"; // Set the game state back to the initial state
  isGameOver = false;

  // Optionally stop any ongoing music or sounds
  backgroundMusic.stop();

  console.log("Game has been reset");
}
