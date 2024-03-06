let synth = new Tone.PolySynth(Tone.Synth).toDestination();

// LFO connected to the modulation of the synth
let lfo = new Tone.LFO({
  frequency: 5, // frequency in Hz
  type: 'sine', // type of waveform
  min: -5, // minimum value of outputs
  max: 5 // maximum value of outputs
});

lfo.connect(synth.volume);

let notes = {
  'q' : 'C4',
  'w' : 'D4',
  'e' : 'E4',
  'r' : 'F4',
  't' : 'G4',
  'y' : 'A4',
  'u' : 'B4',
  'i' : 'C5' 
};

let freqSlider, depthSlider;

function setup() {
  createCanvas(500,500);
  
  // Slider for Frequency Control
  freqSlider = createSlider(0.1, 10, 5, 0.1);
  freqSlider.position(50,250);
  freqSlider.style('width', '400px');

  // Slider for modulation depth control
  depthSlider = createSlider(1,100,50,1);
  depthSlider.position(50,300);
  depthSlider.style('width', '400px');
}

function draw() {
  background('purple');
  textSize(25);
  fill('white');
  text('Play Q-I for synth with modulation!', 60, 220);

  // Update settings based on slider values
  lfo.frequency.value = freqSlider.value();
  lfo.min = -depthSlider.value();
  lfo.max = depthSlider.value();

}


function keyPressed() {
  let playNotes = notes[key];
  if (playNotes) {
    synth.triggerAttack(playNotes);
  }
}

function keyReleased() {
  let playNotes = notes[key];
  if (playNotes) {
  synth.triggerRelease(playNotes, '+0.03');
  }
}

