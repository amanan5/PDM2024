let img;
let initTone = true;
let baseFreq = 200; 
let osc = new Tone.Oscillator(baseFreq, 'square').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.5,
  sustain: 1.0,
  release: 1.0
}).connect(pan);
osc.connect(ampEnv);


let lfo = new Tone.LFO({
  type: 'sine', 
  frequency: 0.5, 
  amplitude: 200, 
}).start();
lfo.connect(osc.frequency); 
let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.8,
  sustain: 1.0,
  release: 0.8
}).connect(gain);

function preload(){
  img = loadImage('assets/static.jpg');
}

function setup() {
  createCanvas(1000,1000);
}

function draw() {
  background(img);
  fill('black');
  rect(60, 335, 900, 100);
  if(mouseIsPressed){
    background('purple');
  }
  fill(250);
  textSize(50);
  text('Press the spacebar to start static effect',75, 400);

}
 
function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');

    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  ampEnv.triggerAttackRelease('4n');
  ampEnv.triggerAttackRelease('4n', '+1');
  ampEnv.triggerAttackRelease('4n', '+2');
}