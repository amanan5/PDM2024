let soundFX;

// preload sound files
function preload () {
  soundFX = new Tone.Players ({
    drums: "assets/drums.mp3",
    laugh: "assets/laugh.mp3",
    tiger: "assets/tiger.mp3",
    whistle: "assets/whistle.mp3"
  }).toDestination(); // sending sounds to audio output
}

function keyPressed() {
  if (key === 'd') {
    soundFX.player("drums").start();
  } else if (key === 'l') {
    soundFX.player("laugh").start();
  } else if (key === 't') {
    soundFX.player("tiger").start();
  } else if (key === 'w') {
    soundFX.player("whistle").start();
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("pink");
  text("Welcome to the Random Sampler", 90, 100);
  text("Press d for drums.", 100, 200);
  text("Press l for laughter.", 100, 210);
  text("Press t for a tiger roar.", 100, 220);
  text("Press w for a slide whistle.", 100, 230);
}
