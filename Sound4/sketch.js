//defining colors array
var colors=['red','orange', 'yellow','green', 'cyan','blue', 'magenta','brown','white', 'black'];
//index of selected color
var selectedColorIndex=0;
//width/height of one cell in color palette
var palette_cell_size=30;
//x,y coordinates of previous point (used to draw a line from this point to new point)
var x, y;
//flag indicating if we are currently drawing something
var drawing=false;

function setup() {
  //using 500x500 window size
  createCanvas(500,500);
  //using a thicker pen
  strokeWeight(10);
  //white background
  background(255, 255, 255);
}

//this method gets called repeatedly so that color palette will stay on top all the time.
function draw() {
  //disabling stroke
  noStroke();
  //drawing each cell in color palette
  for(let i=0;i<colors.length;i++){
    //using color at index i as fill color
    fill(colors[i]);
    //drawing a rectangle at 0,i*palette_cell_size with width and height equals palette_cell_size
    rect(0,i*palette_cell_size,palette_cell_size,palette_cell_size);
  }
  //enabling stroke again
  stroke(colors[selectedColorIndex]);
}

//this method gets called when mouse is pressed
function mousePressed(){
  //checking if mouse point is within color palette
  if(mouseX>=0 && mouseX<palette_cell_size && mouseY>=0 && mouseY<(colors.length*palette_cell_size)){
    //dividing y coordinate by cell size to get index of selected color
    selectedColorIndex=floor(mouseY/palette_cell_size);
    //play the sound effect
    playBrushSound();
    //using that as stroke color
    stroke(colors[selectedColorIndex]);
    //not drawing yet
    drawing=false;  
  }else{
    //otherwise marking current point as starting point, 
    x=mouseX;
    y=mouseY;
    //we are drawing.
    drawing=true;

  }
}

// Color select sound effect
function playBrushSound() {
    let brush = new Tone.NoiseSynth().toDestination();
    let filter = new Tone.AutoFilter({
      frequency: "8m",
      depth: 0.2,
      type: "sine"
    }).toDestination();
    let tremolo = new Tone.Tremolo({
      frequency: "4m",
      depth: 0.3,
      type: "sine"
    }).toDestination();
    let chorus = new Tone.Chorus({
      frequency: "2m",
      depth: 0.5,
      type: "sine"
    }).toDestination();
    let reverb = new Tone.Reverb({
      decay: 2,
      wet: 0.5
    }).toDestination();
    brush.chain(filter, tremolo, chorus, reverb);
    brush.triggerAttackRelease("8n");
  }
  
// Drawing sound effect
function playColorSound() {
  let synth = new Tone.Synth().toDestination();
  let pattern = new Tone.Pattern(function(time, note) {
    synth.triggerAttackRelease(note, "8n", time);
  }, ["C4"]).start(0);
  Tone.Transport.start();
  Tone.Transport.scheduleOnce(function(time) {
    pattern.stop();
  }, "+1");
}

//this gets called whenever mouse is dragged
function mouseDragged(){
  //checking if drawing flag is true before drawing
  if(drawing){
    playColorSound();
    //drawing a line from (x,y) to current mouse position
    line(x,y, mouseX, mouseY);
    //setting current mouse position as new x,y
    x=mouseX;
    y=mouseY;
    
  }
}